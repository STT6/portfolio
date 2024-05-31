<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
	gsap.to('.cube1', {
		duration: 1,
		rotationY: 60,
		rotationX: 30,
		rotationZ: -20,
		ease: 'linear'
	})

	ScrollTrigger.create({
		trigger: '.text-cube',
		start: 'top bottom',
		end: 'top bottom',
		scrub: true,
		animation: gsap.to('.cube1', {
			duration: 1,
			rotationY: 60,
			rotationX: 30,
			rotationZ: -20,
			ease: 'linear'
		})
	})

	ScrollTrigger.create({
		trigger: '.text-cube',
		start: 'top bottom',
		end: 'bottom+=200 bottom',
		scrub: true,
		animation: gsap.fromTo(
			'.text-cube-360',
			{
				rotationZ: 90,
				rotationX: 90,
				x: 150,
				y: 125,
				z: 0

			},
			{
				rotationZ: 40,
				rotationX: 50,

				x: 250,
				y: 375,

				duration: 2,
				ease: 'power1.inOut'
			}
		)
	})
})
</script>

<template>
	<div id="scene">
		<div class="cube1">
			<div class="face front">
				We are innovators
				in creating and
				maximizing
				investments through
				a 360 investment
				ecosystem
				approach.
			</div>
			<div class="face left">
				360
			</div>
		</div>
	</div>
</template>

<!-- <style>
#scene {
    margin-top: 10rem;
    margin-left: 10rem;
}

.cube1 {
    width: 400px;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-100px);
}

.face {
    color: white;
    display: flex;
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    text-align: center;
    text-align: left;
}

.front {
    font-size: 30px;
    transform: rotateY(0deg) translateZ(150px);
}

.left {
    align-items: flex-start;
    padding-top: 0;
    justify-content: center;
    font-size: 65px;
    transform: rotateY(-90deg) translateZ(150px) rotateZ(90deg);
}
</style> -->
