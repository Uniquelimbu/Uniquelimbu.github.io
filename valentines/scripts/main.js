// ============================================
//  MAIN — Wire everything together
// ============================================

(function () {
    'use strict';

    const V  = Valentine;
    const el = V.el;
    const st = V.state;

    // ===== Grab DOM elements =====
    el.cuteFace       = document.getElementById('cuteFace');
    el.yesBtn         = document.getElementById('yesBtn');
    el.noBtn          = document.getElementById('noBtn');
    el.sassyMsg       = document.getElementById('sassyMsg');
    el.questionScreen = document.getElementById('questionScreen');
    el.yesScreen      = document.getElementById('yesScreen');
    el.confettiLayer  = document.getElementById('confettiLayer');
    el.heartsCanvas   = document.getElementById('heartsCanvas');
    el.pupilL         = document.getElementById('pupilL');
    el.pupilR         = document.getElementById('pupilR');

    // ===== YES button =====
    function sayYes() {
        if (st.answered) return;
        st.answered = true;

        el.questionScreen.style.display = 'none';
        el.noBtn.style.display = 'none';
        el.yesScreen.classList.add('active');

        document.body.style.background =
            'linear-gradient(135deg, #fce4ec, #f8bbd0, #ff80ab, #ff4081)';
        document.body.style.backgroundSize = '400% 400%';

        V.confetti.launch();
        let rounds = 0;
        const intv = setInterval(() => {
            V.confetti.launch();
            if (++rounds > 7) clearInterval(intv);
        }, 1400);
    }

    // YES hover: always show happy (even during chase)
    // The frame enforcer pauses while hoveringYes is true
    el.yesBtn.addEventListener('mouseenter', () => {
        if (st.answered) return;
        st.hoveringYes = true;
        el.cuteFace.className = 'cute-face happy';
    });
    el.yesBtn.addEventListener('mouseleave', () => {
        if (st.answered) return;
        st.hoveringYes = false;
        // If chase is active, go back to sad; otherwise default
        if (st.noAttempts > 0) {
            el.cuteFace.className = 'cute-face sad';
        } else {
            el.cuteFace.className = 'cute-face';
        }
    });
    el.yesBtn.addEventListener('click', sayYes);

    // ===== Resize =====
    window.addEventListener('resize', () => {
        V.hearts.resize();
        if (st.escaped) V.noButton.clampToViewport();
    });

    // ===== Disable right-click =====
    document.addEventListener('contextmenu', e => e.preventDefault());

    // ===== Initialize all modules =====
    V.hearts.init();
    V.sparkles.init();
    V.face.init();
    V.noButton.init();

})();
