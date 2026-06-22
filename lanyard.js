import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const cardUrl = './assets/lanyard/card.glb';
const profileImgUrl = './images/profile_no_bg.png';

// Configuration
const LANYARD_WIDTH = 0.085;
const NUM_NODES = 12;
const SEGMENT_LENGTH = 0.35;
const GRAVITY = new THREE.Vector3(0, -32, 0);
const DAMPING = 0.98;
const PHYSICS_SUBSTEPS = 12;
const CARD_OFFSET = 1.4; // Fixed from 2.7 to properly connect the string to the top of the ID card hole

let container, scene, camera, renderer, clock;
let lanyardTexture, cardGLB;
let nodes = [];
let anchorPos = new THREE.Vector3(4.25, 4, 0);
let cardMesh, bandMesh, bandGeometry;
let dragged = false;
let draggedOffset = new THREE.Vector3();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let twistAngle = 0;
let twistVelocity = 0;

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };

// Custom Lanyard Band Texture Compositor (Personalized name repeating, NO React Logo)
function createLanyardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Background gradient for a premium woven fabric look
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#0F0E17');
  grad.addColorStop(0.5, '#1E182A');
  grad.addColorStop(1, '#0C0A10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 128);
  
  // Subtle tech grid/stripes pattern
  ctx.strokeStyle = 'rgba(180, 151, 207, 0.08)';
  ctx.lineWidth = 14;
  for (let i = -128; i < 1024; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 128, 128);
    ctx.stroke();
  }
  
  // Golden/Purple top and bottom border accent lines
  ctx.strokeStyle = '#B497CF';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(1024, 8);
  ctx.moveTo(0, 120);
  ctx.lineTo(1024, 120);
  ctx.stroke();
  
  // Repeating Name & Title branding text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Outfit", system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw repeating segment text along the lanyard band width
  const segments = 4;
  const step = 1024 / segments;
  for (let i = 0; i < segments; i++) {
    const xPos = step * i + step / 2;
    ctx.fillText('MUHAMMED SINAN M  •  DEVELOPER', xPos, 64);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

// Dynamic Badge Canvas Compositor (Compositing custom front face onto card's original baked atlas)
function createBadgeTexture(baseMap) {
  return new Promise((resolve) => {
    let W = 1024;
    let H = 1024;
    
    if (baseMap && baseMap.image) {
      W = baseMap.image.width;
      H = baseMap.image.height;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve(canvas);

    // 1. Draw base baked map if available to preserve edges and back face
    if (baseMap && baseMap.image) {
      ctx.drawImage(baseMap.image, 0, 0, W, H);
    } else {
      ctx.fillStyle = '#0F0E17';
      ctx.fillRect(0, 0, W, H);
    }

    // 2. Draw custom badge on the front UV rect: { x: 0, y: 0, w: 0.5, h: 0.755 }
    const rx = FRONT_UV_RECT.x * W;
    const ry = FRONT_UV_RECT.y * H;
    const rw = FRONT_UV_RECT.w * W;
    const rh = FRONT_UV_RECT.h * H;

    // Create high-res front canvas matching the exact aspect ratio of the UV rect
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = 512;
    frontCanvas.height = 768;
    const fctx = frontCanvas.getContext('2d');

    // Draw card background gradient
    const grad = fctx.createLinearGradient(0, 0, 0, 768);
    grad.addColorStop(0, '#0a0812');
    grad.addColorStop(0.5, '#181329');
    grad.addColorStop(1, '#07050a');
    fctx.fillStyle = grad;
    fctx.fillRect(0, 0, 512, 768);

    // Cyberpunk tech-grid overlays
    fctx.strokeStyle = 'rgba(180, 151, 207, 0.04)';
    fctx.lineWidth = 1;
    for (let x = 0; x < 512; x += 32) {
      fctx.beginPath();
      fctx.moveTo(x, 0);
      fctx.lineTo(x, 768);
      fctx.stroke();
    }
    for (let y = 0; y < 768; y += 32) {
      fctx.beginPath();
      fctx.moveTo(0, y);
      fctx.lineTo(512, y);
      fctx.stroke();
    }

    // Accent card border
    fctx.strokeStyle = 'rgba(180, 151, 207, 0.25)';
    fctx.lineWidth = 10;
    fctx.strokeRect(15, 15, 482, 738);

    // Header title
    fctx.fillStyle = '#B497CF';
    fctx.font = 'bold 22px "Courier New", Courier, monospace';
    fctx.textAlign = 'center';
    fctx.fillText('MEMBER BADGE', 256, 60);

    fctx.strokeStyle = '#B497CF';
    fctx.lineWidth = 2;
    fctx.beginPath();
    fctx.moveTo(80, 80);
    fctx.lineTo(432, 80);
    fctx.stroke();

    // Load and draw transparent background-removed profile image
    const profileImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    profileImg.src = profileImgUrl;

    const drawDetails = () => {
      // Profile details
      fctx.fillStyle = '#ffffff';
      fctx.font = 'bold 28px "Outfit", system-ui, -apple-system, sans-serif';
      fctx.fillText('MUHAMMED SINAN M', 256, 400);

      fctx.fillStyle = '#B497CF';
      fctx.font = '500 16px "Inter", sans-serif';
      fctx.fillText('FULL-STACK ENGINEER', 256, 440);
      fctx.fillText('& AI SYSTEMS BUILDER', 256, 465);

      // Divider line
      fctx.fillStyle = 'rgba(180, 151, 207, 0.15)';
      fctx.fillRect(80, 500, 352, 4);

      // Barcode elements
      const barcodeX = 110;
      const barcodeY = 560;
      const barcodeH = 50;
      const barcodePattern = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 2, 4, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4];
      let currentX = barcodeX;
      fctx.fillStyle = '#ffffff';
      barcodePattern.forEach((width, index) => {
        if (index % 2 === 0) {
          fctx.fillRect(currentX, barcodeY, width * 3, barcodeH);
        }
        currentX += width * 3;
      });

      // Serial Tag
      fctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      fctx.font = '12px monospace';
      fctx.fillText('SN-2026-MSM-998', 256, 635);

      // Draw the completed badge layout onto the left UV rect of our atlas
      ctx.drawImage(frontCanvas, rx, ry, rw, rh);
      
      resolve(canvas);
    };

    profileImg.onload = () => {
      const cx = 256;
      const cy = 240;
      const r = 90;

      // Glow circle backing
      fctx.shadowColor = '#B497CF';
      fctx.shadowBlur = 20;
      fctx.fillStyle = '#181329';
      fctx.beginPath();
      fctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      fctx.fill();
      fctx.shadowBlur = 0; // Reset canvas shadows

      // Mask clip for the profile circle boundary
      fctx.save();
      fctx.beginPath();
      fctx.arc(cx, cy, r, 0, Math.PI * 2);
      fctx.clip();
      
      // Draw background-removed image centered and scaled to cover the circle frame
      const aspect = profileImg.width / profileImg.height;
      let dw = r * 2;
      let dh = r * 2;
      if (aspect > 1) {
        dw = dh * aspect;
      } else {
        dh = dw / aspect;
      }
      fctx.drawImage(profileImg, cx - dw / 2, cy - dh / 2 + 10, dw, dh);
      fctx.restore();

      // Outer border circle
      fctx.strokeStyle = '#B497CF';
      fctx.lineWidth = 4;
      fctx.beginPath();
      fctx.arc(cx, cy, r, 0, Math.PI * 2);
      fctx.stroke();

      // Green active indicator dot
      fctx.fillStyle = '#48bb78';
      fctx.strokeStyle = '#1E182A';
      fctx.lineWidth = 4;
      fctx.beginPath();
      fctx.arc(cx + 65, cy + 65, 15, 0, Math.PI * 2);
      fctx.fill();
      fctx.stroke();

      drawDetails();
    };

    profileImg.onerror = () => {
      // Circle fallback if loading fails
      fctx.fillStyle = 'rgba(255,255,255,0.05)';
      fctx.beginPath();
      fctx.arc(256, 240, 90, 0, Math.PI * 2);
      fctx.fill();
      drawDetails();
    };
  });
}

// Custom Camera-Facing Ribbon Geometry Generator
function createRibbonGeometry(numSegments) {
  const geom = new THREE.BufferGeometry();
  const numVertices = (numSegments + 1) * 2;
  const positions = new Float32Array(numVertices * 3);
  const uvs = new Float32Array(numVertices * 2);
  const indices = [];

  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    uvs[i * 4] = t * 2;     // U axis runs along length (repeating text 2 times)
    uvs[i * 4 + 1] = 0;     // V axis runs across width (left border)
    uvs[i * 4 + 2] = t * 2;
    uvs[i * 4 + 3] = 1;     // V axis runs across width (right border)

    if (i < numSegments) {
      const v = i * 2;
      indices.push(v, v + 1, v + 2);
      indices.push(v + 1, v + 3, v + 2);
    }
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  return geom;
}

function updateRibbonGeometry(geom, curvePoints, camera) {
  const positions = geom.attributes.position.array;
  const numPoints = curvePoints.length;
  const camPos = camera.position;

  for (let i = 0; i < numPoints; i++) {
    const p = curvePoints[i];
    
    let tangent;
    if (i === 0) {
      tangent = new THREE.Vector3().subVectors(curvePoints[1], p).normalize();
    } else if (i === numPoints - 1) {
      tangent = new THREE.Vector3().subVectors(p, curvePoints[i - 1]).normalize();
    } else {
      tangent = new THREE.Vector3().subVectors(curvePoints[i + 1], curvePoints[i - 1]).normalize();
    }

    const toCam = new THREE.Vector3().subVectors(camPos, p).normalize();
    const side = new THREE.Vector3().crossVectors(tangent, toCam).normalize();

    const left = p.clone().addScaledVector(side, -LANYARD_WIDTH / 2);
    const right = p.clone().addScaledVector(side, LANYARD_WIDTH / 2);

    positions[i * 6] = left.x;
    positions[i * 6 + 1] = left.y;
    positions[i * 6 + 2] = left.z;

    positions[i * 6 + 3] = right.x;
    positions[i * 6 + 4] = right.y;
    positions[i * 6 + 5] = right.z;
  }

  geom.attributes.position.needsUpdate = true;
  geom.computeBoundingBox();
  geom.computeBoundingSphere();
}

async function init() {
  container = document.createElement('div');
  container.className = 'lanyard-wrapper';
  document.querySelector('.app-layout').appendChild(container);

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  const isMobile = window.innerWidth < 768;
  camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 20);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, Math.PI);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
  dirLight2.position.set(-5, 3, 2);
  scene.add(dirLight2);

  // Create personalized lanyard band texture
  lanyardTexture = createLanyardTexture();

  // Set the initial anchor position based on device type
  updateAnchorPosition();

  // Initialize nodes for rope physics
  for (let i = 0; i < NUM_NODES; i++) {
    const pos = new THREE.Vector3(anchorPos.x, anchorPos.y - i * SEGMENT_LENGTH, anchorPos.z);
    nodes.push({
      pos: pos.clone(),
      prev: pos.clone()
    });
  }

  const loader = new GLTFLoader();
  loader.load(cardUrl, (gltf) => {
    cardGLB = gltf.scene;

    cardGLB.traverse((child) => {

      if (child.isMesh && child.name === 'card') {
        const baseMap = child.material.map;
        
        // Composite custom details directly on top of card's original texture map
        createBadgeTexture(baseMap).then((compositeCanvas) => {
          const cardTexture = new THREE.CanvasTexture(compositeCanvas);
          cardTexture.colorSpace = THREE.SRGBColorSpace;
          cardTexture.flipY = baseMap ? baseMap.flipY : false;
          cardTexture.anisotropy = 16;
          cardTexture.needsUpdate = true;

          child.material = new THREE.MeshPhysicalMaterial({
            map: cardTexture,
            clearcoat: isMobile ? 0 : 1,
            clearcoatRoughness: 0.15,
            roughness: 0.8,
            metalness: 0.8
          });
        });
      }
    });

    cardGLB.scale.setScalar(2.25);
    scene.add(cardGLB);
    
    // Set initial position
    cardGLB.position.copy(nodes[NUM_NODES - 1].pos);
  });

  // Create ribbon geometry and mesh for the lanyard band
  bandGeometry = createRibbonGeometry(32);
  const bandMaterial = new THREE.MeshBasicMaterial({
    map: lanyardTexture,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false
  });
  bandMesh = new THREE.Mesh(bandGeometry, bandMaterial);
  scene.add(bandMesh);

  clock = new THREE.Clock();

  // Pointer event listeners for interactive dragging
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // Start physics & animation loop
  animate();
}

function updateAnchorPosition() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    anchorPos.set(0, 4, 0);
  } else {
    anchorPos.set(4.25, 4, 0);
  }
  if (nodes.length > 0) {
    nodes[0].pos.copy(anchorPos);
  }
}

function onWindowResize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  updateAnchorPosition();
}

function getPointerWorldPos(x, y, zDepth) {
  const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
  const dir = vec.clone().sub(camera.position).normalize();
  const distance = (zDepth - camera.position.z) / dir.z;
  return camera.position.clone().addScaledVector(dir, distance);
}

function onPointerDown(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  if (!cardGLB) return;

  const intersects = raycaster.intersectObjects(cardGLB.children, true);
  if (intersects.length > 0) {
    dragged = true;
    document.body.style.cursor = 'grabbing';
    
    const clickWorldPos = getPointerWorldPos(mouse.x, mouse.y, cardGLB.position.z);
    draggedOffset.copy(cardGLB.position).sub(clickWorldPos);
  }
}

function onPointerMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  if (dragged) {
    const currentMousePos = getPointerWorldPos(mouse.x, mouse.y, cardGLB.position.z);
    const targetCardPos = currentMousePos.clone().add(draggedOffset);
    
    const parentPos = nodes[NUM_NODES - 2].pos;
    // Compute stable up direction from target card position to the parent rope node
    const upVec = new THREE.Vector3().subVectors(parentPos, targetCardPos).normalize();
    const cardOffset = upVec.clone().multiplyScalar(-CARD_OFFSET);
    
    const targetNodePos = targetCardPos.clone().sub(cardOffset);
    
    // Clamp to maximum rope length relative to anchor pos to prevent stretching
    const maxLen = (NUM_NODES - 1) * SEGMENT_LENGTH;
    const toAnchor = new THREE.Vector3().subVectors(targetNodePos, anchorPos);
    if (toAnchor.length() > maxLen) {
      toAnchor.setLength(maxLen);
      targetNodePos.copy(anchorPos).add(toAnchor);
    }
    
    // Sync prev and pos to keep Verlet integration stable during dragging
    nodes[NUM_NODES - 1].prev.copy(nodes[NUM_NODES - 1].pos);
    nodes[NUM_NODES - 1].pos.copy(targetNodePos);
  } else {
    raycaster.setFromCamera(mouse, camera);
    if (cardGLB) {
      const intersects = raycaster.intersectObjects(cardGLB.children, true);
      document.body.style.cursor = intersects.length > 0 ? 'grab' : 'auto';
    }
  }
}

function onPointerUp() {
  if (dragged) {
    dragged = false;
    document.body.style.cursor = 'auto';
    // Clear release velocity to prevent simulation explosion (smashing)
    nodes[NUM_NODES - 1].prev.copy(nodes[NUM_NODES - 1].pos);
  }
}

function updatePhysics(dt) {
  if (dt <= 0) return;
  const substepDt = dt / PHYSICS_SUBSTEPS;

  for (let s = 0; s < PHYSICS_SUBSTEPS; s++) {
    // 1. Verlet Integration
    for (let i = 1; i < NUM_NODES; i++) {
      if (i === NUM_NODES - 1 && dragged) continue;

      const node = nodes[i];
      const vel = new THREE.Vector3().subVectors(node.pos, node.prev).multiplyScalar(DAMPING);
      node.prev.copy(node.pos);
      node.pos.add(vel);
      node.pos.addScaledVector(GRAVITY, substepDt * substepDt);
    }

    // 2. Constraint Relaxation
    for (let r = 0; r < 8; r++) {
      nodes[0].pos.copy(anchorPos);

      for (let i = 1; i < NUM_NODES; i++) {
        const n1 = nodes[i - 1];
        const n2 = nodes[i];
        const delta = new THREE.Vector3().subVectors(n2.pos, n1.pos);
        const len = delta.length();
        if (len === 0) continue;

        const diff = SEGMENT_LENGTH - len;
        const percent = (diff / len) * 0.5;
        const offset = delta.multiplyScalar(percent);

        if (i === 1) {
          n2.pos.addScaledVector(offset, 2.0);
        } else if (i === NUM_NODES - 1 && dragged) {
          n1.pos.addScaledVector(offset, -2.0);
        } else {
          n1.pos.addScaledVector(offset, -1.0);
          n2.pos.addScaledVector(offset, 1.0);
        }
      }
    }
  }

  // 3. Update Model Position & Swivel Rotation
  if (cardGLB) {
    const cardPos = nodes[NUM_NODES - 1].pos;
    const parentPos = nodes[NUM_NODES - 2].pos;

    const upVec = new THREE.Vector3().subVectors(parentPos, cardPos).normalize();
    const targetForward = new THREE.Vector3(0, 0, 1);
    const rightVec = new THREE.Vector3().crossVectors(upVec, targetForward).normalize();
    const forwardVec = new THREE.Vector3().crossVectors(rightVec, upVec).normalize();

    const m = new THREE.Matrix4().makeBasis(rightVec, upVec, forwardVec);
    cardGLB.quaternion.setFromRotationMatrix(m);

    // Apply torque twisting effect based on horizontal movement
    const horizontalSwivel = nodes[NUM_NODES - 1].pos.x - nodes[NUM_NODES - 2].pos.x;
    const targetTwist = horizontalSwivel * 0.45;
    
    const springForce = (targetTwist - twistAngle) * 80;
    const dampingForce = -twistVelocity * 6;
    twistVelocity += (springForce + dampingForce) * dt;
    twistAngle += twistVelocity * dt;

    cardGLB.rotateY(twistAngle);

    const cardOffset = upVec.clone().multiplyScalar(-CARD_OFFSET);
    cardGLB.position.copy(cardPos).add(cardOffset);
  }
}

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.03);
  updatePhysics(dt);

  if (bandMesh) {
    const curvePoints = nodes.map(n => n.pos);
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    curve.curveType = 'chordal';
    const smoothPoints = curve.getPoints(32);
    updateRibbonGeometry(bandGeometry, smoothPoints, camera);
  }

  renderer.render(scene, camera);
}

// Start loading sequence when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
