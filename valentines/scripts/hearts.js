// ============================================
//  FLOATING HEARTS — Canvas animation
// ============================================

(function () {
    'use strict';

    const HEART_COUNT = 35;
    const heartColors = [
        'rgba(236,64,122,0.12)',
        'rgba(244,143,177,0.14)',
        'rgba(252,228,236,0.18)',
        'rgba(240,98,146,0.10)',
        'rgba(255,183,197,0.15)',
        'rgba(206,147,216,0.09)',
    ];

    let canvas, ctx;
    const hearts = [];

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 30 + Math.random() * 60,
            size: Math.random() * 22 + 12,
            speed: Math.random() * 0.6 + 0.25,
            drift: (Math.random() - 0.5) * 0.4,
            wobbleAmp: Math.random() * 20 + 10,
            wobbleSpeed: Math.random() * 0.015 + 0.008,
            wobbleOffset: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.3,
            color: heartColors[Math.floor(Math.random() * heartColors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            time: 0,
        };
    }

    function drawHeart(cx, cy, size, color, rotation) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.beginPath();
        const s = size / 2;
        ctx.moveTo(0, s * 0.4);
        ctx.bezierCurveTo(-s, -s * 0.4, -s, -s, 0, -s * 0.6);
        ctx.bezierCurveTo(s, -s, s, -s * 0.4, 0, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < hearts.length; i++) {
            const h = hearts[i];
            h.time += 1;
            h.y -= h.speed;
            h.x += h.drift + Math.sin(h.time * h.wobbleSpeed + h.wobbleOffset) * 0.3;
            h.rotation += h.rotationSpeed;
            const wobbleX = Math.sin(h.time * h.wobbleSpeed + h.wobbleOffset) * h.wobbleAmp;
            let alpha = h.opacity;
            if (h.y < 80) alpha *= h.y / 80;
            const rgba = h.color.replace(/[\d.]+\)$/, (alpha * 0.8).toFixed(2) + ')');
            drawHeart(h.x + wobbleX, h.y, h.size, rgba, h.rotation);
            if (h.y < -40) Object.assign(h, createHeart());
        }
        requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Public API
    Valentine.hearts = {
        init: function () {
            canvas = Valentine.el.heartsCanvas;
            ctx = canvas.getContext('2d');
            resizeCanvas();
            for (let i = 0; i < HEART_COUNT; i++) {
                const h = createHeart();
                h.y = Math.random() * canvas.height;
                hearts.push(h);
            }
            animate();
        },
        resize: resizeCanvas,
    };
})();
