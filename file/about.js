function init() {
	container = document.createElement("div"), container.className = "banner",
		$(".banner").replaceWith(container),
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4), camera.position.z = 1e3,
		scene = new
	THREE.Scene, particles = new Array;
	for (var e = 2 * Math.PI, n = new
		THREE.ParticleCanvasMaterial({
			color: 0x00a793,
			program: function (n) {
				n.beginPath(), n.arc(0, 0, 1, 0, e, !0), n.fill()
			}
		}), o = 0, i = 0; AMOUNTX > i; i++)
		for (var t = 0; AMOUNTY > t; t++) particle = particles[o++] = new THREE.Particle(n), particle.position.
	x = i * SEPARATION - AMOUNTX * SEPARATION / 2, particle.position.z = t * SEPARATION - AMOUNTY * SEPARATION / 2,
		scene.add(particle);
	renderer = new THREE.CanvasRenderer, 
	    renderer.setSize(window.innerWidth, 700),
		container.appendChild(renderer.domElement), 
		$(".banner").get(0).addEventListener("mousemove", onDocumentMouseMove, !1),
        $(".banner").get(0).addEventListener("touchstart", onDocumentTouchStart, !1), $(".banner").get(0)
		.addEventListener("touchmove", onDocumentTouchMove, !1), window.addEventListener("resize", onWindowResize, !1)
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2, windowHalfY = 184, camera.aspect = window.innerWidth / 2,
		camera.updateProjectionMatrix(), renderer.setSize(window.innerWidth, 700)
}

function onDocumentMouseMove(e) {
	mouseX = e.clientX - windowHalfX, 
	mouseY = e.clientY - windowHalfY-200;
}

function onDocumentTouchStart(e) {
	1 === e.touches.length && (e.preventDefault(), mouseX = e.touches[0].pageX - windowHalfX, mouseY = e.touches[0]
		.pageY - windowHalfY)
}

function onDocumentTouchMove(e) {
	1 === e.touches.length && (e.preventDefault(), mouseX = e
		.touches[0].pageX - windowHalfX, mouseY = e.touches[0].pageY - windowHalfY)
}

function animate() {
	requestAnimationFrame(animate), render()
}

function render() {
	camera.position.x += .05 * (mouseX - camera.position.x), 
	camera.position.y += .05 * (-mouseY - camera.position.y), 
	camera.lookAt(scene.position);
	for (var e = 0, n = 0; AMOUNTX > n; n++)
		for (var o = 0; AMOUNTY > o; o++) particle = particles[e++], particle.position.y = 50 * Math.sin(.3 * (n + count)) + 50 * Math.sin(.5 * (o + count)),
			particle.scale.x = particle.scale.y = 2 * (Math.sin(.3 * (n + count)) + 1) + 2 * (Math.sin(.5 * (o + count)) + 1);
	renderer.render(scene, camera), count += .1
}
var SEPARATION = 100,
	AMOUNTX = 50,
	AMOUNTY = 50,
	container, camera, scene, renderer, particles, particle, count = 0,
	mouseX = 300,
	mouseY = -200,
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2;
init(), animate();