'use client';

import React, { useEffect, useRef } from 'react';

function isClickable(target: Element | null): boolean {
  if (!target || !(target instanceof Element)) return false;
  if (target.closest('[data-no-cursor-hover="true"]')) return false;

  return Boolean(
    target.closest(
      'a, button, [role="button"], input, textarea, select, label, .clickable, .ripple-btn, .action-card, .social-icon-btn, [data-clickable="true"]'
    )
  );
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = -100;
    let mouseY = -100;

    const updateHoverState = (el: Element | null) => {
      if (isClickable(el)) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      dot.style.opacity = '1';

      updateHoverState(e.target as Element | null);
    };

    const onScroll = () => {
      if (mouseX >= 0 && mouseY >= 0) {
        const el = document.elementFromPoint(mouseX, mouseY);
        updateHoverState(el);
      }
    };

    const onMouseDown = () => {
      document.body.classList.add('cursor-active');
    };

    const onMouseUp = () => {
      document.body.classList.remove('cursor-active');
    };

    const onMouseLeaveDoc = () => {
      dot.style.opacity = '0';
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
    };

    const onMouseEnterDoc = () => {
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    document.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
      document.documentElement.classList.remove('hide-native-cursor');
    };
  }, []);

  return <div className="cursor-dot" id="cursorDot" ref={dotRef} aria-hidden="true" />;
}
