<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	let history: string[] = $state([]);
	let currentQuestion: string | undefined = $state(undefined);
	let kapitel: { name: string; enabled: boolean; questions: string[] }[] = $state([]);
	let index: number = $state(1);

	onMount(() => {
		kapitel = [
			{
				name: 'Kapitel 1',
				enabled: true,
				questions: [
					'1. Namnge tre olika verktyg som används för elarbeten och vad de används till:',
					'2. Namnge tre olika verktyg som används för verkstadsarbeten och vad de använd, till.',
					'3. Varför är det viktigt att alltid använda rätt skruvmejsel?',
					'4. När använder man en borrmaskin med slag?'
				]
			},
			{
				name: 'Kapitel 2',
				enabled: false,
				questions: [
					'5. Vilka olika arbetsområden finns det för en elektriker?',
					'6. Vad menas med KNX?',
					'7. Vad menas med styrning av värme – ventilation?',
					'8. Vad gör en distributionselektriker?',
					'9. Varför används CAD i elektrikeryrket?',
					'10. Vad är Allmän behörighet?',
					'11. Vem utfärdar elbehörigheter?',
					'12. Vilka elarbeten får du göra utan någon behörighet?',
					'13. Vems ansvar är det om du kopplar ett vägguttag fel hemma hos dig själv?',
					'14. Vad står ECY för?',
					'15. Vad gör ECY?',
					'16. Vad är en utsatt del? Rita och förklara.',
					'17. Var går gränsen mellan låg- och högspänning?',
					'18. Vad är en starkströmsanläggning?'
				]
			},
			{
				name: 'Kapitel 3',
				enabled: true,
				questions: [
					'19. Vem stiftar lagar i Sverige?',
					'20. Vad kan man hitta i utförandeföreskriften?',
					'21. Vad innebär ”Innehavarens ansvar”?',
					'22. Vad innebär elsäkert arbete?',
					'23. Vad är en elarbetsansvarig?',
					'24. Hur kan du kontrollera en anläggning före drifttagning?'
				]
			},
			{
				name: 'Kapitel 4',
				enabled: true,
				questions: [
					'25. Vad beror det på hur allvarliga skadorna blir vid en elolycka?',
					'26. Om du råkar ut för elchock. Vid vilken strömstorlek får du sådan kramp i musklerna att det blir svårt att släppa taget?',
					'27. Hur kan en ljusbåge uppstå?',
					'28. Hur ska du agera vid en beröringsolycka?'
				]
			},
			{
				name: 'Kapitel 5',
				enabled: true,
				questions: [
					'29. Vad är ledare?',
					'30. Vad är kardeler?',
					'31. Vad står EK, FK, MK och RK för?',
					'32. Ange fyra olika anslutningsalternativ.',
					'33. I vilka av anslutningsalternativen ska man tvinna kardelerna?',
					'34. Vad innebär kontaktpressning?',
					'35. Vad kallas det för när man med värme sammanfogar två metaller med ett metalliskt bindemedel?',
					'36. Vad är flussmedel och var används det?',
					'37. Vad innebär god vätning?',
					'38. Vilken lödtemperatur är lämplig för lödning med blyfritt lod?'
				]
			},
			{
				name: 'Kapitel 6',
				enabled: true,
				questions: [
					'39. Varför vill man ha en hög spänning från kraftstationen?',

					'40. Vilka spänningar leveras fram till slutabonnenten (hushåll) i Sverige och vad heter dem?',
					'41. Vilka två uppgifter har huvudsäkringarna i mätartavlan?',
					'42. Vad är en servisledning och var finns den?',
					'43. Hur många faser ansluts oftast till abonnenten och vad kallas de för?',
					'44. Vad är det för skillnad på ett TN-C system och ett TN-S system?',
					'45. Vilken funktion har PEN ledaren?',
					'46. Vilken uppgift har en säkring och var hittar du den?',
					'47. Hur kan man identifiera en skyddsledare?',
					'48. Vad används skyddsledaren till?',
					'49. När går det ström i skyddsledaren?',
					'50. Vilka krav finns det på att det ska finnas en skyddsledare?',
					'51. Hur kan skyddsledaren skydda en människa?',
					'52. Förklara vad som händer vid ett jordfel i ett TN-system och varför?',
					'53. Vad kan hända om det saknas skyddsledare till diskmaskinen och det samtidigt skulle uppstå ett isolationsfel?',
					'54. Vad innebär dubbel isolering?'
				]
			},
			{
				name: 'Kapitel 7',
				enabled: true,
				questions: [
					'55. Hur väljer man rätt säkring?',
					'56. Vilken märkström tål den största porslinssäkringen för gänga II?',
					'57. Var i centralen används en passdel?',
					'58. Vilken färg har signalpärlan på en 20 Amperes porslinssäkring?',
					'59. När använder man en trög säkring?',
					'60. Vad ska en gruppförteckning innehålla?',
					'61. Du håller en porslinssäkring i handen och kan inte okulärt avgöra om den är hel. Hur kan du göra istället för att ta reda på om den är hel?',
					'62. Vilka apparater kan man hitta i en normcentral? Nämn minst tre.',
					'63. Vilka tre saker ska man alltid göra innan man börja arbeta i en elanläggning?',
					'64. Vilka färger ska de olika ledarna i ett trefassystem ha?'
				]
			},
			{
				name: 'Kapitel 8',
				enabled: true,
				questions: [
					'65. Hur fungerar en jordfelsbrytare?',
					'66. När skyddar en jordfelsbrytare?',
					'67. Vad ska man tänka på när man väljer jordfelsbrytare? Nämn minst tre saker.',
					'68. När använder man en säkerhetsbrytare?',
					'69. Vad innebär nollspänningsutlösning?',
					'70. Vad betyder ELV?',
					'71. Ge exempel på när man använder ELV.'
				]
			},
			{
				name: 'Kapitel 9',
				enabled: true,
				questions: [
					'72. Vad innebär begreppet IP-klass?',
					'73. Hur vet man att man väljer rätt IP-klasss?',
					'74. När använder man Aluminium istället för koppar i en kabel?',
					'75. Vilken information får du av följande kabelbeteckning EKK 3G1,5',
					'76. Ge exempel på kabelbeteckning för en halogenfri installationskabel',
					'77. Var använder man en EKRK?',
					'78. Var använder man en EKLK?',
					'79. Var använder man kraftkablar?',
					'80. Vilka egenskaper har en sladd?',
					'81. Ge exempel på var man använder en sladd?',
					'82. Hur kan man utföra en öppen förläggning?',
					'83. Vad innebär dold förläggning?',
					'84. Vilket avstånd ska man ha mellan klamrarna i en utanpåliggande installation?'
				]
			},
			{
				name: 'Kapitel 10',
				enabled: true,
				questions: [
					'85. Vad är det för skillnad i att arbeta med betong och lättbetong?',
					'86. Vad ska man tänka på när man borrar i kakel och klinker?',
					'87. Vilken plugg är tillräcklig vid uppfästning av lätta föremål om väggen är av gips, tegel eller betong.',
					'88. Hur ska införingshålet och skruven vara i förhållande till en traditionell plastplugg?'
				]
			},
			{
				name: 'Kapitel 11',
				enabled: false,
				questions: [
					'89. Vilken strömställare använder man för att styra två lampor var för sig från samma plats?',
					'90. Vilka strömställare använder man för att kunna tända och släcka en lampa från två olika platser?',
					'91. Vilka ledare kopplar man till en enpolig strömställare?',
					'92. När använder man en korsomkopplare?',
					'93. Rita symbolen för en trappomkopplare',
					'94. Hur fungerar trådlös styrning?',
					'95. På vilka andra sätt kan man styra belysning?',
					'96. Vilken ledare ska man ansluta till en anslutning märkt P eller L?',
					'97. Rita en skyddsledarsymbol',
					'98. Vad betyder anslutningar märkta med X',
					'99. Vilka färger ska du välja till fas, neutralledare och skyddsjord?',
					'100. Vilken färg kan du välja till tändtråd och mellantrådar?',
					'101. Vilken färg hade skyddsledaren på 60-talet?'
				]
			},
			{
				name: 'Kapitel 12',
				enabled: false,
				questions: [
					'102. När ska man undvika stege och istället välja andra alternativ?',
					'103. Var regleras det att du som elektriker alltid ska kunna arbeta i rätt arbetsställning?',
					'104. Var hittar man stegens glidskydd?',
					'105. Vilken lutningsvinkel ska man eftersträva när man lutar stegen mot en vägg?',
					'106. Var föreligger en stor risk för elektrikern att skada sig?',
					'107. Hur ser man att en stege är en godkänd stege?'
				]
			},
			{
				name: 'Kapitel 13',
				enabled: false,
				questions: [
					'108. När använder man en installationsritning?',
					'109. Vad är det för skillnad på styrkrets och huvudkrets?',
					'110. Vad är ett relä?',
					'111. Var använder man en kontaktor?',
					'112. Hur fungerar ett impulsrelä?',
					'113. Rita en brytande kontakt',
					'114. Vad är en referensbeteckning?',
					'115. Förklara varför man använder en hållkrets?',
					'116. Vad är en plint och vad används den till?'
				]
			},
			{
				name: 'Kapitel 14',
				enabled: false,
				questions: [
					'117. Varför är det en säkrare metod att ange mått från en baslinje?',
					'118. Vad innebär en skala 1:40',
					'119. Hur många A4 papper går det på ett A1 papper?',
					'120. Vad markerar man med en streckad linje på en ritning',
					'121. Vilken tolerans går att avläsa i det angivna måttet 200±2',
					'122. Var använder man en tumstock?',
					'123. Var använder man en stålskala?',
					'124. Vad kan man mäta med ett skjutmått?',
					'125. Hur noggrant kan man mäta med en mikrometer?',
					'126. Vilka hjälpmedel finns föra att få en kabel i lod när den klamras?'
				]
			},
			{
				name: 'Kapitel 15',
				enabled: false,
				questions: [
					'127. När använder man en körnare?',
					'128. Vad använder man en bågfil till?',
					'129. Vad använder man för att göra hål i en gipsskiva som ska pass till en infälld dosa?',
					'130. Hur utförs en invändig gängning?'
				]
			},
			{
				name: 'Kapitel 16',
				enabled: false,
				questions: [
					'131. Vad är skillnaden på psykosocial och fysisk arbetsmiljö?',
					'132. Vem är ytterst ansvarig för arbetsmiljön på ett företag?',
					'133. Vilka arbetsuppgifter har ett skyddsombud?',
					'134. Vad är belastningsergonomi?',
					'135. Hur ska du få en så bra arbetsställning som möjligt på en arbetsplats?',
					'136. Hur ska du lyfta tunga saker så att du inte förstör din kropp?',
					'137. Om du ska jobba på ett bygge, vilka arbetsmiljöfaktorer utsätts du för och hur skyddar du dig?',
					'138. Vad är ESD och vilka sorters ESD-skydd finns?',
					'139. Vad innebär kvalité när det handlar om installationer?',
					'140. Vad innebär 5S?',
					'141. Hur ska vi sortera våra el-sopor? Ge förslag på olika sorteringstunnor.',
					'142. Vad är heta arbeten?'
				]
			}
		];
	});

	function pool(): string[] {
		return kapitel.filter((k) => k.enabled).flatMap((k) => k.questions);
	}

	function gen(): string | undefined {
		const totalPool: string[] = pool();
		let result =
			totalPool.length > 0 ? totalPool[Math.floor(Math.random() * totalPool.length)] : undefined;

		return result;
	}

	function start() {
		currentQuestion = gen();

		if (currentQuestion) {
			history = [...history, currentQuestion];
		}
	}

	function next() {
		let newQuestion = gen();

		// Prevent same question twice in a row
		while (newQuestion === currentQuestion) {
			newQuestion = gen();
		}

		currentQuestion = newQuestion;

		if (currentQuestion) {
			history = [...history, currentQuestion];
		}
	}

	function previous() {}

	function growFade(node: Element, { duration = 200, start = 0.85, easing = cubicOut } = {}) {
		return {
			duration,
			easing,
			css: (t: number) => {
				const scale = start + t * (1 - start);
				return `
				transform: scale(${scale});
				opacity: ${t};
			`;
			}
		};
	}
</script>

<div class="row">
	<div class="col-xl-auto col-md-6 col-12 border-end">
		{#each kapitel as k (k.name)}
			<input type="checkbox" bind:checked={k.enabled} /> {k.name} <br />
		{/each}
	</div>
	<div class="col">
		{#if !currentQuestion}
			<div class="text-center">
				<button class="btn btn-lg btn-primary" onclick={start}>Start</button>
			</div>
		{:else}
			<p>Questions: {pool().length}</p>
			{#key currentQuestion}
				<h4>
					{#if currentQuestion}
						{kapitel.find((k) => currentQuestion && k.questions.includes(currentQuestion))?.name}
					{/if}
				</h4>
				<h5 in:growFade={{ duration: 200, start: 0.85, easing: cubicOut }}>
					{currentQuestion}
				</h5>
			{/key}
			<div class="text-center">
				<button class="btn btn-secondary mx-3" disabled={history.length === 0 || true}
					>Previous</button
				><button class="btn btn-primary mx-3" onclick={next}>Next</button>
			</div>
		{/if}
	</div>
</div>
