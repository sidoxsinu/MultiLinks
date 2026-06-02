document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        // Calculate X and Y relative to the button
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Pass coordinates to CSS variables
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

const magneticEls = document.querySelectorAll('.magnetic-btn');

magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Calculate distance from center of the button (strength of magnetic pull: 0.06)
        const dx = (e.clientX - cx) * 0.06;
        const dy = (e.clientY - cy) * 0.06;

        // Keep the original hover scale based on the button class
        let scale = '';
        if (el.classList.contains('pill-btn')) scale = ' scale(1.025)';
        if (el.classList.contains('social-icon-btn')) scale = ' scale(1.08)';

        // Apply the transformation
        el.style.transform = `translate(${dx}px, ${dy}px)${scale}`;
    });

    el.addEventListener('mouseleave', () => {
        // Snap back to original position defined in CSS
        el.style.transform = '';
    });
});
