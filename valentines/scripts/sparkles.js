// ============================================
//  SPARKLES — Random sparkle effect
// ============================================

(function () {
    'use strict';

    function spawnSparkle() {
        if (Valentine.state.answered) return;
        const el = document.createElement('div');
        el.className = 'sparkle';
        el.style.left = Math.random() * 100 + '%';
        el.style.top  = Math.random() * 100 + '%';
        el.style.width = el.style.height = (Math.random() * 4 + 3) + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2600);
    }

    Valentine.sparkles = {
        init: function () {
            setInterval(spawnSparkle, 350);
        },
    };
})();
