/**
 * Modern Interactive 3D Lanyard ID Badge
 * Features GSAP mouse-tilt physics with damping, holographic sheen tracking,
 * natural pendulum entrance settle, and frosted glass aesthetic.
 */

(function () {
  const badgeCard = document.getElementById('lanyard-badge-card');
  const badgeWrapper = document.getElementById('lanyard-badge-wrapper');
  if (!badgeCard) return;

  // Track if mouse is over badge or page
  let isHovered = false;
  let targetRotZ = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  // 1. Initial Mount: Gentle natural pendulum settle
  function playPendulumEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.fromTo(
      badgeCard,
      {
        rotateZ: 14,
        rotateX: 4,
        rotateY: -6,
        transformOrigin: 'top center',
        opacity: 0,
        y: -30,
      },
      {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        opacity: 1,
        duration: 2.2,
        ease: 'elastic.out(1, 0.35)',
        delay: 0.3,
      }
    );
  }

  // 2. Mouse Tilt Physics with Damping
  function handleMouseMove(e) {
    if (!badgeCard) return;

    const rect = badgeCard.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Relative distance (-1 to +1 normalized to screen/card neighborhood)
    const dx = (mouseX - cardCenterX) / (window.innerWidth / 2);
    const dy = (mouseY - cardCenterY) / (window.innerHeight / 2);

    // Calculate rotation clamped between -8deg and +8deg
    targetRotZ = Math.max(-8, Math.min(8, dx * 7));
    targetRotX = Math.max(-8, Math.min(8, -dy * 8));
    targetRotY = Math.max(-10, Math.min(10, dx * 9));

    // Calculate coordinates for holographic sheen (--mx, --my in percentages)
    const mx = Math.max(0, Math.min(100, ((mouseX - rect.left) / rect.width) * 100));
    const my = Math.max(0, Math.min(100, ((mouseY - rect.top) / rect.height) * 100));

    badgeCard.style.setProperty('--mx', `${mx.toFixed(1)}%`);
    badgeCard.style.setProperty('--my', `${my.toFixed(1)}%`);

    if (typeof gsap !== 'undefined') {
      gsap.to(badgeCard, {
        rotateZ: targetRotZ,
        rotateX: targetRotX,
        rotateY: targetRotY,
        duration: isHovered ? 0.3 : 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }

  function handleMouseEnter() {
    isHovered = true;
    badgeCard.classList.add('badge-hovered');
  }

  function handleMouseLeave() {
    isHovered = false;
    badgeCard.classList.remove('badge-hovered');

    // Natural elastic settle back to 0 rotation
    if (typeof gsap !== 'undefined') {
      gsap.to(badgeCard, {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.4,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    } else {
      badgeCard.style.transform = 'rotateZ(0deg) rotateX(0deg) rotateY(0deg)';
    }

    // Reset sheen position smoothly
    badgeCard.style.setProperty('--mx', '50%');
    badgeCard.style.setProperty('--my', '50%');
  }

  // Pointer drag interaction (touch or mouse grab)
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function onPointerDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    badgeCard.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const dragRotZ = Math.max(-12, Math.min(12, deltaX * 0.15));
    const dragRotX = Math.max(-10, Math.min(10, -deltaY * 0.12));

    if (typeof gsap !== 'undefined') {
      gsap.to(badgeCard, {
        rotateZ: dragRotZ,
        rotateX: dragRotX,
        duration: 0.1,
        ease: 'power1.out',
      });
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    badgeCard.style.cursor = 'grab';

    if (typeof gsap !== 'undefined') {
      gsap.to(badgeCard, {
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.8,
        ease: 'elastic.out(1.2, 0.3)',
      });
    }
  }

  // Bind events
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  badgeCard.addEventListener('mouseenter', handleMouseEnter);
  badgeCard.addEventListener('mouseleave', handleMouseLeave);
  badgeCard.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', playPendulumEntrance);
  } else {
    playPendulumEntrance();
  }
})();
