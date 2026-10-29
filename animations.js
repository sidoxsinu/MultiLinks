/**
 * Micro-animations & Interaction Controller
 * - GSAP Page Entrance Orchestration
 * - Custom Blend-Mode Dot Cursor
 * - One-Click Email Copy Feedback & Toast System
 * - Radial Sheen & Micro-magnetic Hover Interactions
 */

(function () {
  // ─────────────────────────────────────────────────────────────
  // 1. GSAP PAGE ENTRANCE
  // ─────────────────────────────────────────────────────────────
  function initPageEntrance() {
    if (typeof gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Profile Header Elements (Status pill, avatar, name, roles)
    tl.fromTo(
      '.anim-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }
    );

    // Quick Social Icons Staggered Pop-in
    tl.fromTo(
      '.anim-social-btn',
      { opacity: 0, scale: 0.75, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    // Section title & badges
    tl.fromTo(
      '.anim-section-title',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.15'
    );

    // Action Cards (staggered 0.08s, power2.out)
    tl.fromTo(
      '.anim-card',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    // Footer
    tl.fromTo(
      '.anim-footer',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. CUSTOM BLEND-MODE CURSOR
  // ─────────────────────────────────────────────────────────────
  function initCustomCursor() {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = document.getElementById('cursorDot');
    if (!dot) return;

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = -100;
    let mouseY = -100;

    function isClickable(target) {
      if (!target || !(target instanceof Element)) return false;
      if (target.closest('[data-no-cursor-hover="true"]')) return false;

      return Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, label, .clickable, .ripple-btn, .action-card, .social-icon-btn, [data-clickable="true"]'
        )
      );
    }

    function updateHoverState(el) {
      if (isClickable(el)) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      dot.style.opacity = '1';

      updateHoverState(e.target);
    }, { passive: true });

    window.addEventListener('scroll', () => {
      if (mouseX >= 0 && mouseY >= 0) {
        const el = document.elementFromPoint(mouseX, mouseY);
        updateHoverState(el);
      }
    }, { passive: true });

    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. ONE-CLICK EMAIL COPY FEEDBACK & TOAST
  // ─────────────────────────────────────────────────────────────
  function initEmailCopy() {
    const copyTriggers = document.querySelectorAll('.email-copy-trigger');
    const toast = document.getElementById('toast');
    let toastTimeout;

    function showToast(message) {
      if (!toast) return;
      toast.querySelector('.toast-msg').textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    copyTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const email = trigger.getAttribute('data-email') || 'muhammedsinan.m67@gmail.com';

        navigator.clipboard.writeText(email).then(() => {
          // Visual feedback on card
          const labelEl = trigger.querySelector('.email-card-label');
          const subEl = trigger.querySelector('.email-card-sub');
          const checkIcon = trigger.querySelector('.email-check-icon');
          const defaultIcon = trigger.querySelector('.email-default-icon');

          const origLabel = labelEl ? labelEl.textContent : 'Email';
          const origSub = subEl ? subEl.textContent : email;

          if (labelEl) labelEl.textContent = 'Copied to Clipboard!';
          if (subEl) subEl.textContent = '✓ Ready to paste anywhere';
          if (checkIcon) checkIcon.classList.remove('hidden');
          if (defaultIcon) defaultIcon.classList.add('hidden');

          trigger.classList.add('border-emerald-500/60', 'bg-emerald-950/20');

          showToast('Email copied to clipboard: ' + email);

          setTimeout(() => {
            if (labelEl) labelEl.textContent = origLabel;
            if (subEl) subEl.textContent = origSub;
            if (checkIcon) checkIcon.classList.add('hidden');
            if (defaultIcon) defaultIcon.classList.remove('hidden');
            trigger.classList.remove('border-emerald-500/60', 'bg-emerald-950/20');
          }, 2400);
        }).catch((err) => {
          console.warn('Clipboard write failed, opening mailto:', err);
          window.location.href = `mailto:${email}`;
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 4. RADIAL SHEEN & MAGNETIC HOVER
  // ─────────────────────────────────────────────────────────────
  function initInteractiveCardEffects() {
    const cards = document.querySelectorAll('.action-card, .glass-panel');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--card-x', `${x}px`);
        card.style.setProperty('--card-y', `${y}px`);
      });
    });

    const magneticElements = document.querySelectorAll('.magnetic-btn');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.1;
        const dy = (e.clientY - cy) * 0.1;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPageEntrance();
      initCustomCursor();
      initEmailCopy();
      initInteractiveCardEffects();
    });
  } else {
    initPageEntrance();
    initCustomCursor();
    initEmailCopy();
    initInteractiveCardEffects();
  }
})();
