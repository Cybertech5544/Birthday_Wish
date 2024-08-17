var maxParticleCount = 150; // set max confetti count
var particleSpeed = 1; // set the particle animation speed
var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"];
var particles = [];
var waveAngle = 0;

document.addEventListener("click", handler, true);

function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 16.6666667);
            };
    })();

    var canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        canvas.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;display:block;z-index:999999;pointer-events:none");
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, true);
    }
    var context = canvas.getContext("2d");
    
    // Add a 15-second delay before starting the animation
    setTimeout(function() {
        while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, width, height));

        (function runAnimation() {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            updateParticles();
            drawParticles(context);
            requestAnimFrame(runAnimation);
        })();
    }, 15000); // 15-second delay

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
    }

    function drawParticles(context) {
        var particle;
        var x;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
            context.stroke();
        }
    }

    function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle);
            particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;

            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                resetParticle(particle, width, height);
            }
        }
    }
})();
