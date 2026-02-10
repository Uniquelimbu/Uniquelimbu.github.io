// ============================================
//  CONFETTI — Celebration burst
// ============================================

(function () {
    'use strict';

    const emoji  = ['💕','💖','💗','❤️','🩷','✨','🌹','💐','🎀','🦋','💝'];
    const colors = ['#e91e63','#f06292','#f48fb1','#ff4081','#ff80ab',
                    '#ce93d8','#f44336','#ffd700','#ff69b4','#ffb6c1'];

    function launch() {
        const container = Valentine.el.confettiLayer;
        for (let i = 0; i < 55; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'confetti-piece';
                if (Math.random() > 0.4) {
                    el.textContent = emoji[Math.floor(Math.random() * emoji.length)];
                    el.style.fontSize = (Math.random() * 18 + 12) + 'px';
                } else {
                    el.style.width  = (Math.random() * 9 + 5) + 'px';
                    el.style.height = (Math.random() * 9 + 5) + 'px';
                    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                }
                el.style.left = Math.random() * 100 + '%';
                el.style.animationDuration = (Math.random() * 3 + 2) + 's';
                el.style.animationDelay = Math.random() * 0.4 + 's';
                container.appendChild(el);
                setTimeout(() => el.remove(), 6000);
            }, i * 28);
        }
    }

    Valentine.confetti = { launch: launch };
})();
