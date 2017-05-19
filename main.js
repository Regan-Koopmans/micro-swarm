var particleSize = 5;
var particles = []
var numParticles = 10;
var jitter = 2;
var rate = 0.05;
var canvas = document.getElementById("canvas-main");
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;
var context = canvas.getContext("2d");
var directions = []
var center_x = 251;
var center_y = 251;
var objective = (x,y) => Math.pow(x - center_x,2) + Math.pow(y - center_y,2);
function initParticles() {
    for (var x = 0; x < numParticles; x++) {
        particles.push([Math.random()*canvas.width, Math.random()*canvas.height]);
        directions.push([0,0]);
    }
}
function moveParticles() {
    var best = [null, null];
    for (x in particles) {
        if (best[0] == null || objective(particles[x][0], particles[x][1]) <
            objective(best[0], best[1])) {
                best[0] = particles[x][0];
                best[1] = particles[x][1];
        }
    }
    for (x in particles) {
        particles[x][0] = Math.min(particles[x][0] + directions[x][0] + rate*(best[0]  - particles[x][0]) + Math.pow(-1, Math.round(Math.random())) * Math.random() * jitter, canvas.width - particleSize);
        particles[x][1] = Math.min(particles[x][1] + directions[x][1] + rate*(best[1] - particles[x][1]) + Math.pow(-1, Math.round(Math.random())) * Math.random() * jitter, canvas.height - particleSize)
        directions[x][0] = Math.round(rate*(best[0]  - particles[x][0]))
        directions[x][1] = Math.round(rate*(best[1]  - particles[x][1]))
    }
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (x in particles) {
        context.fillRect(particles[x][0],particles[x][1],particleSize,particleSize);
    }
    moveParticles();
    window.requestAnimationFrame(draw);
}
initParticles();
window.requestAnimationFrame(draw);