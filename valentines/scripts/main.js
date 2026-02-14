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
    el.bgSong         = document.getElementById('bgSong');
    el.scrollPrompt   = document.getElementById('scrollPrompt');
    el.sectionCollage = document.getElementById('sectionCollage');
    el.sectionMessage = document.getElementById('sectionMessage');
    el.envelopeWrap   = document.getElementById('envelopeWrap');
    el.openLetterBtn  = document.getElementById('openLetterBtn');
    el.sectionDots    = Array.from(document.querySelectorAll('.section-dot'));

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
            el.yesScreen.scrollTop = 0;

            // Change body background to match the sky
            document.body.style.background = '#87CEEB';
            document.body.style.animation = 'none';

            // Allow scrolling on the page
            document.body.style.overflow = 'auto';

            // Play the background song
            el.bgSong.volume = 0.5;
            el.bgSong.play().catch(function () {
                // Autoplay blocked — play on next user interaction
                document.addEventListener('click', function playOnce() {
                    el.bgSong.play();
                    document.removeEventListener('click', playOnce);
                });
            });

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

    // ===== Section navigation on YES page =====
    const yesSections = Array.from(document.querySelectorAll('.yes-screen .yes-section'));
    let activeSectionIndex = 0;

    function setActiveDot(index) {
        if (!el.sectionDots || !el.sectionDots.length) return;
        el.sectionDots.forEach(function (dot, dotIndex) {
            dot.classList.toggle('active', dotIndex === index);
        });
    }

    function goToYesSection(index) {
        if (!yesSections.length) return;
        const bounded = Math.max(0, Math.min(index, yesSections.length - 1));
        activeSectionIndex = bounded;
        setActiveDot(activeSectionIndex);
        yesSections[activeSectionIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Scroll prompt moves to the collage section (if it exists)
    if (el.scrollPrompt) {
        el.scrollPrompt.addEventListener('click', function () {
            const collageIndex = yesSections.indexOf(el.sectionCollage);
            goToYesSection(collageIndex >= 0 ? collageIndex : 1);
        });
    }

    if (el.sectionDots && el.sectionDots.length) {
        el.sectionDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                const sectionIndex = Number(dot.dataset.section);
                goToYesSection(sectionIndex);
            });
        });
    }

    if (el.openLetterBtn && el.envelopeWrap) {
        el.openLetterBtn.addEventListener('click', function () {
            const isOpen = el.envelopeWrap.classList.toggle('open');
            el.openLetterBtn.textContent = isOpen ? 'Close Letter' : 'Open Letter';
        });
    }

    el.yesScreen.addEventListener('scroll', function () {
        if (!st.answered || !yesSections.length) return;
        const currentScrollTop = el.yesScreen.scrollTop;

        let nearestIndex = 0;
        let nearestDistance = Infinity;
        yesSections.forEach(function (section, index) {
            const distance = Math.abs(section.offsetTop - currentScrollTop);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        if (nearestIndex !== activeSectionIndex) {
            activeSectionIndex = nearestIndex;
            setActiveDot(activeSectionIndex);
        }
    }, { passive: true });

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
