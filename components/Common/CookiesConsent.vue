<template>
	<div />
</template>

<script setup lang="ts">
import { useGtm } from '@gtm-support/vue-gtm'
import { onMounted } from 'vue'

const { $bus, $klaro, $i18n } = useNuxtApp()

const gtm = useGtm()

let gtmEnabled = false

const klaroConfig = {
	htmlTexts: true,
	noticeAsModal: true,
	hideDeclineAll: true,
	acceptAll: true,
	mustConsent: false,
	cookieName: 'klaro-cc',
	lang: $i18n?.locale.value || 'sl',
	services: [
		{
			name: 'necessary',
			title: 'Necessary',
			purposes: ['necessary'],
			default: true,
			required: true
		},
		{
			name: 'analytics',
			title: 'Google Analytics',
			purposes: ['analytics'],
			cookies: [
				[/^_ga/i, '/'],
				[/^_gid/i, '/']
			],
			default: false,
			optOut: false,
			callback: (consent) => {
				if (consent === true) {
					enableGTM()
				}
			}
		},
		{
			name: 'marketing',
			title: 'Marketing',
			purposes: ['marketing'],
			cookies: [
				[/^_gcl/i, '/']
			],
			default: false,
			optOut: false,
			callback: (consent) => {
				if (consent === true) {
					enableGTM()
				}
			}
		}
	],
	translations: {
		hr: {
			ok: 'U redu',
			acceptSelected: 'Spremi',
			acceptAll: 'Prihvati sve',
			purposeItem: {
				service: 'Servis',
				services: 'Servisi'
			},
			service: {
				disableAll: {
					title: 'Dozvoli sve',
					description: 'Koristite ovaj prekidač ako želite omogućiti/onemogućiti sve aplikacije odjednom.'
				},
				required: {
					title: '(obvezni)'
				}
			},
			consentModal: {
				title: 'Informacije koje prikupljamo',
				description: 'Ovdje možete vidjeti i podesiti informacije koje prikupljamo o Vama.'
			},
			consentNotice: {
				learnMore: 'Saznajte više',
				description: 'Mi prikupljamo i procesiramo Vaše osobne podatke radi slijedećeg: {purposes}.'
			},
			purposes: {
				analytics: {
					title: 'Analitički',
					description:
						'Analitički kolačići pomažu nam unaprijediti internetsku stranicu prikupljanjem i analizom podataka o njezinu korištenju.'
				},
				marketing: {
					title: 'Marketinški',
					description:
						'Marketinške kolačiće koristimo radi povećanja relevantnosti oglasa koji Vam se prikazuju.'
				},
				necessary: {
					title: 'Nužni',
					description:
						'Nužni kolačići omogućavaju osnovne funkcionalnosti. Bez njih internetska stranica ne može pravilno funkcionirati, a isključiti ih možete mijenjanjem postavki u svojem internetskom pregledniku.'
				}
			}
		},
		sl: {
			ok: 'V redu',
			acceptSelected: 'Sprejmi',
			acceptAll: 'Sprejmi vse',
			save: 'Shrani',
			purposeItem: {
				service: 'Storitev',
				services: 'Storitve'
			},
			service: {
				disableAll: {
					title: 'Onemogoči vse',
					description: 'Uporabite to stikalo, da omogočite/onemogočite vse aplikacije hkrati.'
				},
				required: {
					title: '(obvezni)'
				},
				purpose: 'Namen'
			},
			consentModal: {
				title: 'Informacije, ki jih zbiramo',
				description: 'Tu si lahko ogledate in nastavite informacije, ki jih zbiramo o vas.'
			},
			consentNotice: {
				learnMore: 'Več',
				description: 'Vaše osebne podatke zbiramo in obdelujemo za naslednje namene: {purposes}.',
				changeDescription: 'Preverite nastavitve piškotkov.'
			},
			purposes: {
				analytics: {
					title: 'Analitični',
					description:
						'Analitični piškotki nam pomagajo izboljšati spletno stran z zbiranjem in analizo podatkov o njeni uporabi.'
				},
				marketing: {
					title: 'Trženjski',
					description:
						'Trženjske piškotke uporabljamo za izboljšanje ustreznosti oglasov, ki se vam prikažejo.'
				},
				necessary: {
					title: 'Nujni',
					description:
						'Nujni piškotki omogočajo osnovne funkcionalnosti. Brez njih spletna stran ne more pravilno delovati, izklopite pa jih lahko s spreminjanjem nastavitev v spletnem brskalniku.'
				}
			}
		}
	}
}

function showCookieNotice () {
	$klaro.show(klaroConfig)
}
function enableGTM () {
	if (!gtmEnabled) {
		gtm?.enable(true)
		gtmEnabled = true
	}
}

onMounted(() => {
	if (process.client) {
		$bus.on('showCookieNotice', showCookieNotice)
		$klaro.setup(klaroConfig)
	}
})
</script>
