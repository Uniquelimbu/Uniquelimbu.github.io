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

        // Build the garden scenery inside YES screen
        V.sunflower.buildGarden();

        // Smooth fade-out of question screen
        el.questionScreen.classList.add('question-fade-out');
        el.noBtn.style.display = 'none';

        // After fade completes, swap to celebration page
        setTimeout(function () {
            el.questionScreen.style.display = 'none';
            el.yesScreen.classList.add('active');

            // Change body background to match the sky
            document.body.style.background = '#87CEEB';
            document.body.style.animation = 'none';

            // Start sunflower shower
            V.sunflower.shower();

            // Confetti alongside the shower
            setTimeout(function () {
                V.confetti.launch();
                var rounds = 0;
                var intv = setInterval(function () {
                    V.confetti.launch();
                    if (++rounds > 5) clearInterval(intv);
                }, 1800);
            }, 400);
        }, 600);
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
