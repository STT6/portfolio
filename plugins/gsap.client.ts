import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
	gsap.registerPlugin(SplitText)
	gsap.registerPlugin(ScrollTrigger)
})
