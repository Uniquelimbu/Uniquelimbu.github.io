// ============================================
//  CUTE FACE — Expressions + eye tracking
// ============================================

(function () {
    'use strict';

    let pupilL, pupilR, eyeL, eyeR, cuteFace;

    // Track a single pupil toward the mouse
    function trackPupil(eyeEl, pupilEl) {
        const st   = Valentine.state;
        const rect = eyeEl.getBoundingClientRect();
        const cx   = rect.left + rect.width / 2;
        const cy   = rect.top  + rect.height / 2;

        const dx    = st.mouseX - cx;
        const dy    = st.mouseY - cy;
        const angle = Math.atan2(dy, dx);
        const dist  = Math.sqrt(dx * dx + dy * dy);

        const maxOff = Math.min(rect.width, rect.height) * 0.28;
        const ratio  = Math.min(dist / 220, 1);
        const ox = Math.cos(angle) * maxOff * ratio;
        const oy = Math.sin(angle) * maxOff * ratio;

        pupilEl.style.transform =
            'translate(calc(-50% + ' + ox.toFixed(1) + 'px), calc(-50% + ' + oy.toFixed(1) + 'px))';
    }

    // rAF loop for eye tracking
    function updateEyes() {
        const st = Valentine.state;
        if (!st.answered && !cuteFace.classList.contains('happy')) {
            trackPupil(eyeL, pupilL);
            trackPupil(eyeR, pupilR);
        }
        requestAnimationFrame(updateEyes);
    }

    // Public API
    Valentine.face = {
        init: function () {
            cuteFace = Valentine.el.cuteFace;
            pupilL   = Valentine.el.pupilL;
            pupilR   = Valentine.el.pupilR;
            eyeL     = document.querySelector('.eye.left');
            eyeR     = document.querySelector('.eye.right');

            // Mouse / touch tracking for eyes
            document.addEventListener('mousemove', (e) => {
                Valentine.state.mouseX = e.clientX;
                Valentine.state.mouseY = e.clientY;
            });
            document.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    Valentine.state.mouseX = e.touches[0].clientX;
                    Valentine.state.mouseY = e.touches[0].clientY;
                }
            }, { passive: true });

            updateEyes();
        },
    };
})();
