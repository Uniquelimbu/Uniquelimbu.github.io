// ============================================
//  NO BUTTON — Slow & short escape logic
//  Orbits around center content, avoids
//  overlapping face, text, and YES button
// ============================================

(function () {
    'use strict';

    // Collect rects of individual elements to avoid (not the whole container)
    function getExclusionZones() {
        const zones = [];
        const margin = 12;

        // Collect each element the NO button shouldn't overlap
        const selectors = [
            '#cuteFace',        // the face
            '.question',        // "Will you be my Valentine?"
            '.sub-text',        // "~ choose wisely ~"
            '#yesBtn',          // YES button
            '.sassy-msg',       // sassy message text
        ];

        selectors.forEach(function (sel) {
            const elem = document.querySelector(sel);
            if (elem) {
                const r = elem.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                    zones.push({
                        left:   r.left   - margin,
                        top:    r.top    - margin,
                        right:  r.right  + margin,
                        bottom: r.bottom + margin,
                    });
                }
            }
        });

        return zones;
    }

    // Check if a rect overlaps any exclusion zone
    function overlapsZones(x, y, w, h, zones) {
        for (let i = 0; i < zones.length; i++) {
            const z = zones[i];
            if (x < z.right && x + w > z.left && y < z.bottom && y + h > z.top) {
                return true;
            }
        }
        return false;
    }

    function escapeNoButton() {
        const st     = Valentine.state;
        const el     = Valentine.el;
        const noBtn  = el.noBtn;
        const yesBtn = el.yesBtn;
        const msgs   = Valentine.sassyMessages;

        st.noAttempts++;

        // First escape: record position, switch to fixed
        if (!st.escaped) {
            const rect    = noBtn.getBoundingClientRect();
            st.noBtnPos.x = rect.left;
            st.noBtnPos.y = rect.top;
            noBtn.classList.add('escaped');
            st.escaped = true;
        }

        const bw    = noBtn.offsetWidth;
        const bh    = noBtn.offsetHeight;
        const pad   = 20;
        const zones = getExclusionZones();

        // Center of the viewport — we want the button to stay in the
        // central region, not flee to corners
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const centerX = vw / 2;
        const centerY = vh / 2;

        // Define a region around center where the button should stay
        // (inner 70% of the screen)
        const regionLeft   = vw * 0.15;
        const regionRight  = vw * 0.85 - bw;
        const regionTop    = vh * 0.10;
        const regionBottom = vh * 0.90 - bh;

        // Try random positions within the central region that don't
        // overlap any exclusion zone
        let bestX  = st.noBtnPos.x;
        let bestY  = st.noBtnPos.y;
        let found  = false;
        let bestDist = 0;

        for (let attempt = 0; attempt < 50; attempt++) {
            // Random position within the central region
            let nx = regionLeft + Math.random() * (regionRight  - regionLeft);
            let ny = regionTop  + Math.random() * (regionBottom - regionTop);

            // Must be at least 80px away from current position
            const dx = nx - st.noBtnPos.x;
            const dy = ny - st.noBtnPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) continue;

            // Must not overlap any exclusion zone
            if (!overlapsZones(nx, ny, bw, bh, zones)) {
                // Prefer positions that are a moderate distance (not too far)
                if (!found || (dist < 250 && dist > bestDist)) {
                    bestX = nx;
                    bestY = ny;
                    bestDist = dist;
                    found = true;
                }
                // Good enough if we found one within 250px
                if (found && dist < 250) break;
            }
        }

        // Clamp to viewport just in case
        bestX = Math.max(pad, Math.min(bestX, vw - bw - pad));
        bestY = Math.max(pad, Math.min(bestY, vh - bh - pad));

        st.noBtnTarget.x = bestX;
        st.noBtnTarget.y = bestY;

        // Face goes SAD — set directly, no function call
        st.currentEmotion = 'sad';
        Valentine.el.cuteFace.className = 'cute-face sad';

        // Grow YES button gradually
        st.yesBtnScale = Math.min(1.6, 1 + st.noAttempts * 0.045);
        yesBtn.style.transform = 'scale(' + st.yesBtnScale + ')';

        // NO button keeps full size and opacity — no shrinking
        noBtn.dataset.noScale = 1;

        // Sassy message
        const sassyMsg = el.sassyMsg;
        sassyMsg.textContent = msgs[st.noAttempts % msgs.length];
        sassyMsg.classList.remove('visible');
        void sassyMsg.offsetWidth;
        sassyMsg.classList.add('visible');

        // Change NO text after 4 tries
        if (st.noAttempts > 4) {
            const texts = ['No? 🤔','Really?','Think again','Nah','Lol no','😢','🏃‍♀️💨','🫥','Pls no','🥲'];
            noBtn.textContent = texts[st.noAttempts % texts.length];
        }
    }

    // Smooth slow animation loop (ease = 0.04)
    function smoothLoop() {
        const st    = Valentine.state;
        const noBtn = Valentine.el.noBtn;

        if (st.escaped) {
            const ease = 0.04;
            st.noBtnPos.x += (st.noBtnTarget.x - st.noBtnPos.x) * ease;
            st.noBtnPos.y += (st.noBtnTarget.y - st.noBtnPos.y) * ease;

            noBtn.style.transform =
                'translate(' + st.noBtnPos.x.toFixed(1) + 'px, ' +
                st.noBtnPos.y.toFixed(1) + 'px)';
            noBtn.style.left = '0';
            noBtn.style.top  = '0';
        }

        // ENFORCE sad face every frame — BUT allow happy when hovering YES
        if (st.noAttempts > 0 && !st.answered && !st.hoveringYes) {
            var face = Valentine.el.cuteFace;
            if (face.className !== 'cute-face sad') {
                face.className = 'cute-face sad';
            }
        }

        requestAnimationFrame(smoothLoop);
    }

    // Public API
    Valentine.noButton = {
        init: function () {
            const noBtn = Valentine.el.noBtn;
            noBtn.addEventListener('mouseenter', escapeNoButton);
            noBtn.addEventListener('mousedown', (e) => { e.preventDefault(); escapeNoButton(); });
            noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); escapeNoButton(); }, { passive: false });
            smoothLoop();
        },
        clampToViewport: function () {
            const st  = Valentine.state;
            const pad = 20;
            const btn = Valentine.el.noBtn;
            st.noBtnTarget.x = Math.max(pad, Math.min(st.noBtnTarget.x, window.innerWidth  - btn.offsetWidth  - pad));
            st.noBtnTarget.y = Math.max(pad, Math.min(st.noBtnTarget.y, window.innerHeight - btn.offsetHeight - pad));
        },
    };
})();
