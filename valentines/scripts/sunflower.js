// ============================================
//  SUNFLOWER — Shower effect + garden scenery
// ============================================

(function () {
    'use strict';

    // Shower sunflowers from the top of the screen
    function shower() {
        var container = document.createElement('div');
        container.className = 'sf-shower';
        document.body.appendChild(container);

        var total = 80;
        for (var i = 0; i < total; i++) {
            (function (index) {
                setTimeout(function () {
                    var sf = document.createElement('div');
                    sf.className = 'sf-drop';
                    sf.textContent = '\uD83C\uDF3B';

                    // Random horizontal position
                    sf.style.left = (Math.random() * 95) + '%';

                    // Random size
                    sf.style.fontSize = (30 + Math.random() * 30) + 'px';

                    // Random fall duration and slight sway
                    var duration = 2 + Math.random() * 2;
                    sf.style.animationDuration = duration + 's';

                    container.appendChild(sf);

                    // Remove after animation
                    setTimeout(function () {
                        sf.remove();
                    }, duration * 1000 + 100);
                }, index * 60); // stagger each sunflower (faster spawning)
            })(i);
        }

        // Remove container after all done
        setTimeout(function () {
            container.remove();
        }, total * 60 + 4500);
    }

    // Build the sunflower garden scenery in the YES screen
    function buildGarden() {
        var yesScreen = Valentine.el.yesScreen;

        // Garden layer with multiple sunflowers
        var garden = document.createElement('div');
        garden.className = 'sunflower-garden';

        var flowerData = [
            { left: '3%',  stemH: 180, headSize: 48, delay: 0 },
            { left: '10%', stemH: 220, headSize: 55, delay: 0.3 },
            { left: '18%', stemH: 160, headSize: 42, delay: 0.1 },
            { left: '25%', stemH: 240, headSize: 58, delay: 0.5 },
            { left: '32%', stemH: 190, headSize: 50, delay: 0.2 },
            { left: '40%', stemH: 210, headSize: 52, delay: 0.4 },
            { left: '48%', stemH: 250, headSize: 60, delay: 0.6 },
            { left: '55%', stemH: 175, headSize: 45, delay: 0.15 },
            { left: '62%', stemH: 230, headSize: 56, delay: 0.35 },
            { left: '70%', stemH: 195, headSize: 48, delay: 0.25 },
            { left: '78%', stemH: 215, headSize: 53, delay: 0.45 },
            { left: '85%', stemH: 170, headSize: 44, delay: 0.1 },
            { left: '92%', stemH: 235, headSize: 57, delay: 0.55 },
            { left: '7%',  stemH: 140, headSize: 38, delay: 0.2 },
            { left: '35%', stemH: 130, headSize: 36, delay: 0.3 },
            { left: '58%', stemH: 145, headSize: 40, delay: 0.4 },
            { left: '80%', stemH: 135, headSize: 37, delay: 0.15 },
            { left: '95%', stemH: 155, headSize: 43, delay: 0.5 },
        ];

        flowerData.forEach(function (f) {
            var flower = document.createElement('div');
            flower.className = 'garden-flower';
            flower.style.left = f.left;

            var head = document.createElement('div');
            head.className = 'head';
            head.textContent = '🌻';
            head.style.fontSize = f.headSize + 'px';
            head.style.animationDelay = f.delay + 's';

            var stem = document.createElement('div');
            stem.className = 'stem';
            stem.style.height = f.stemH + 'px';

            // Add leaves
            if (f.stemH > 150) {
                var leafL = document.createElement('div');
                leafL.className = 'leaf left';
                leafL.textContent = '🌿';
                leafL.style.top = Math.floor(f.stemH * 0.4) + 'px';
                stem.appendChild(leafL);

                if (f.stemH > 200) {
                    var leafR = document.createElement('div');
                    leafR.className = 'leaf right';
                    leafR.textContent = '🌿';
                    leafR.style.top = Math.floor(f.stemH * 0.65) + 'px';
                    stem.appendChild(leafR);
                }
            }

            flower.appendChild(head);
            flower.appendChild(stem);
            garden.appendChild(flower);
        });

        yesScreen.appendChild(garden);

        // Grass blades
        var grassLayer = document.createElement('div');
        grassLayer.className = 'grass-layer';
        for (var g = 0; g < 60; g++) {
            var blade = document.createElement('div');
            blade.className = 'grass-blade';
            blade.style.left = (g / 60 * 100 + Math.random() * 1.5) + '%';
            blade.style.height = (20 + Math.random() * 35) + 'px';
            blade.style.animationDelay = (Math.random() * 2) + 's';
            blade.style.animationDuration = (2 + Math.random() * 1.5) + 's';
            grassLayer.appendChild(blade);
        }
        yesScreen.appendChild(grassLayer);

        // Clouds
        ['cloud-1', 'cloud-2', 'cloud-3'].forEach(function (cls) {
            var cloud = document.createElement('div');
            cloud.className = 'cloud ' + cls;
            yesScreen.appendChild(cloud);
        });

        // Sun
        var sun = document.createElement('div');
        sun.className = 'scene-sun';
        yesScreen.appendChild(sun);

        // Butterflies
        var butterflies = ['🦋', '🦋', '🌸'];
        butterflies.forEach(function (emoji, i) {
            var bf = document.createElement('div');
            bf.className = 'butterfly';
            bf.textContent = emoji;
            bf.style.top  = (15 + Math.random() * 30) + '%';
            bf.style.left = (10 + i * 30 + Math.random() * 15) + '%';
            bf.style.animationDelay = (i * 2.5) + 's';
            bf.style.animationDuration = (6 + Math.random() * 4) + 's';
            yesScreen.appendChild(bf);
        });

        // Floating petals in the air
        for (var p = 0; p < 8; p++) {
            var petal = document.createElement('div');
            petal.className = 'floating-petal';
            petal.textContent = '🌼';
            petal.style.left = (Math.random() * 90 + 5) + '%';
            petal.style.top = -(Math.random() * 20 + 5) + '%';
            petal.style.fontSize = (14 + Math.random() * 12) + 'px';
            petal.style.animationDuration = (8 + Math.random() * 7) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            yesScreen.appendChild(petal);
        }
    }

    // Public API
    Valentine.sunflower = {
        shower: shower,
        buildGarden: buildGarden,
    };
})();
