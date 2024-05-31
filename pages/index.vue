<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const textRef = ref<HTMLElement | null>(null)

onMounted(() => {
	gsap.registerPlugin(SplitText)
	gsap.registerPlugin(ScrollTrigger)

	// const split = ref()
	const splitLogos = ref()
	const splitLogos2 = ref()
	const splitParagraph = ref()

	if (textRef.value) {
		// Commented out the animation for .main-text
		// split.value = new SplitText('.main-text', {
		// 	type: 'words'
		// })

		splitLogos.value = new SplitText('.text-above-logos', {
			type: 'words'
		})

		splitLogos2.value = new SplitText('.text-above-logos-2', {
			type: 'words'
		})

		splitParagraph.value = new SplitText('.text-paragraph', {
			type: 'lines'
		})

		// Removed the ScrollTrigger animation for .main-text
		// ScrollTrigger.create({
		// 	trigger: '.main-text',
		// 	start: 'top bottom',
		// 	end: 'bottom+=200 bottom',
		// 	scrub: true,
		// 	animation: gsap.fromTo(
		// 		split.value.words,
		// 		{
		// 			opacity: 0,
		// 			y: 200
		// 		},
		// 		{
		// 			opacity: 1,
		// 			y: 0,
		// 			stagger: 0.1,
		// 			easing: 'power4.easeOut',
		// 			duration: 2
		// 		}
		// 	)
		// })

		function animateLogos (target: string, trigger: string) {
			gsap.fromTo(
				target,
				{
					opacity: 0,
					y: 200
				},
				{
					scrollTrigger: {
						trigger,
						start: 'top bottom',
						end: 'bottom+=200 bottom',
						scrub: true
					},
					opacity: 1,
					y: 0,
					stagger: 0.1,
					easing: 'power4.easeOut',
					duration: 2
				}
			)
		}
		animateLogos('.logos-1 img', '.logos-1')
		animateLogos('.logos-2 img', '.logos-2')

		ScrollTrigger.create({
			trigger: '.text-above-logos',
			start: 'top bottom',
			end: 'bottom+=200 bottom',
			scrub: true,
			animation: gsap.fromTo(
				splitLogos.value.words,
				{
					opacity: 0,
					y: 200
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					easing: 'power4.easeOut',
					duration: 2
				}
			)
		})

		ScrollTrigger.create({
			trigger: '.text-above-logos-2',
			start: 'top bottom',
			end: 'bottom+=200 bottom',
			scrub: true,
			animation: gsap.fromTo(
				splitLogos2.value.words,
				{
					opacity: 0,
					y: 200
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					easing: 'power4.easeOut',
					duration: 2
				}
			)
		})

		ScrollTrigger.create({
			trigger: '.line',
			start: 'top bottom',
			end: 'bottom+=200 bottom',
			scrub: true,
			animation: gsap.fromTo(
				'.line',
				{
					width: '1%'
				},
				{
					width: '100%'
				}
			)
		})

		ScrollTrigger.create({
			trigger: '.text-paragraph',
			start: 'top bottom',
			end: 'bottom+=200 bottom',
			scrub: true,
			animation: gsap.fromTo(
				splitParagraph.value.lines,
				{
					opacity: 0,
					y: 500
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					easing: 'power4.easeOut',
					duration: 2
				}
			)
		})

		ScrollTrigger.create({
			trigger: '.cube1',
			start: 'center bottom',
			end: 'center center',
			scrub: true,
			animation: gsap.to('.cube1', {
				rotationY: 60,
				rotationX: 30,
				rotationZ: -20,
				ease: 'linear'
			})
		})
	}
})
</script>

<template>
	<section>
		<section>
			<div class="container mt-5">
				<div class="row justify-content-center">
					<div class="col-8">
						<div class="main-text text-center">
							<h3 ref="textRef" class="main-text title">
								Hi! I'm Miha, a passionate front-end developer dedicated to creating engaging and user-friendly websites.
							</h3>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- <section>
			<div class="container">
				<div class="row logos-1">
					<div class="text-above-logos">
						U-Invest Members
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 0.6493px, 0px);
						opacity: 0.9935;
					"
					>
						<img src="../images/elevate.png">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 2.178px, 0px);
						opacity: 0.9782;
					"
					>
						<img src="../images/konvert.png">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 5.7663px, 0px);
						opacity: 0.9423;
					"
					>
						<img src="../images/jonatanMars.png">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 13.0215px, 0px);
						opacity: 0.8698;
					"
					>
						<img src="../images/vzajemci.png">
					</div>
				</div>

				<div class="line" />

				<div class="row logos-2">
					<div class="text-above-logos-2">
						Investments
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center logos-2"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 0.6493px, 0px);
						opacity: 0.9935;
					"
					>
						<img src="../images/elevate.png" alt="Elevate" class="img-fluid">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 2.178px, 0px);
						opacity: 0.9782;
					"
					>
						<img src="../images/konvert.png" alt="Kreatorij" class="img-fluid">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 5.7663px, 0px);
						opacity: 0.9423;
					"
					>
						<img src="../images/jonatanMars.png" alt="Jonatan Mars" class="img-fluid">
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 13.0215px, 0px);
						opacity: 0.8698;
					"
					>
						<img src="../images/vzajemci.png" alt="Vzajemci" class="img-fluid">
					</div>
				</div>
			</div>
		</section> -->

		<section id="#about-us">
			<div class="container">
				<div class="row">
					<h5 id="about-us" class="col-12 col-lg-5 text-paragraph">
						I am an intermediate Vue Developer with a strong frontend development background and a good grasp of React. Proficient in Vue.js and its ecosystem, including state management, component-based architecture, and RESTful API integration. Skilled in creating dynamic, user-friendly web applications, enhancing user experiences, and optimizing performance. Experienced with GitHub, GitLab, and Figma.
					</h5>
				</div>
			</div>
		</section>

		<section class="pb-5">
			<div class="container">
				<div class="row logos-1">
					<div class="text-above-logos">
						Skills
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 0.6493px, 0px);
						opacity: 0.9935;
					"
					>
						JAVASCRIPT
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 2.178px, 0px);
						opacity: 0.9782;
					"
					>
						TYPESCRIPT
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 5.7663px, 0px);
						opacity: 0.9423;
					"
					>
						HTML
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 13.0215px, 0px);
						opacity: 0.8698;
					"
					>
						CSS
					</div>
				</div>

				<div class="line" />

				<div class="row logos-2">
					<!-- <div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center logos-2 text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 0.6493px, 0px);
						opacity: 0.9935;
					"
					>
						YEET
					</div> -->
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 2.178px, 0px);
						opacity: 0.9782;
					"
					>
						C++
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 5.7663px, 0px);
						opacity: 0.9423;
					"
					>
						C#
					</div>
					<div
						class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph"
						style="
						translate: none;
						rotate: none;
						scale: none;
						transform: translate3d(0px, 13.0215px, 0px);
						opacity: 0.8698;
					"
					>
						PYTHON
					</div>
				</div>
			</div>
		</section>

		<!-- <div class="section">
			<div class="container">
				<div id="scene">
					<div class="cube1">
						<div class="face front">
							We are innovators in creating and maximizing investments
							through a 360 investment ecosystem approach.
						</div>
						<div class="face left">
							360
						</div>
					</div>
				</div>
			</div>
		</div> -->

		<!-- <section id="get-in-touch">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-10 col-lg-8">
						<div class="intrigued text-center">
							<p class="intrigued">
								Intrigued? So are we.
								<a href="#get-in-touch" class="links">
									Get in touch.
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section> -->
	</section>
</template>
