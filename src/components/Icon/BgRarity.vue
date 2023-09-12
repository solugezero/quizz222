<script setup>
  const props = defineProps({
    currentRarity: {
      type: String,
      default: 'common'
    }
  })
  const rarities = ref({
    'Consumer': [
      '#8D8D8D', //0
      '#8D8D8D', //1
      '#8D8D8D', //2
      '#8D8D8D', //3
      '#8D8D8D', //4
      '#8D8D8D', //5
      '#8D8D8D', //6
      '#8D8D8D', //7
      '#8D8D8D', //8
      '#8D8D8D', //9
      '#8D8D8D', //10
      '#8D8D8D', //11
      '#8D8D8D', //12
      '#8D8D8D', //13
      '#8D8D8D', //14
      '#8D8D8D', //15
      '#8D8D8D' //16
    ],
    'Industrial': [
      '#5e98d9', //0
      '#5e98d9', //1
      '#5e98d9', //2
      '#5e98d9', //3
      '#5e98d9', //4
      '#5e98d9', //5
      '#5e98d9', //6
      '#5e98d9', //7
      '#5e98d9', //8
      '#5e98d9', //9
      '#5e98d9', //10
      '#5e98d9', //11
      '#5e98d9', //12
      '#5e98d9', //13
      '#5e98d9', //14
      '#5e98d9', //15
      '#5e98d9' //16
    ],
    'Mil-Spec': [
      '#1414A7', //0
      '#1417A8', //1
      '#0B6DCD', //2
      '#05ABE8', //3
      '#01D2F9', //4
      '#00E1FF', //5
      '#01DCFD', //6
      '#02CCF6', //7
      '#05B3EB', //8
      '#088FDC', //9
      '#0C61C8', //10
      '#122AB0', //11
      '#01D4FA', //12
      '#0891DD', //13
      '#0D5BC5', //14
      '#1134B5', //15
      '#131DAB' //16
    ],
    'Restricted': [
      '#8847ff', //0
      '#8847ff', //1
      '#8847ff', //2
      '#8847ff', //3
      '#8847ff', //4
      '#8847ff', //5
      '#8847ff', //6
      '#8847ff', //7
      '#8847ff', //8
      '#8847ff', //9
      '#8847ff', //10
      '#8847ff', //11
      '#8847ff', //12
      '#8847ff', //13
      '#8847ff', //14
      '#8847ff', //15
      '#8847ff' //16
    ],
    'Classified': [
      '#1414A7', //0
      '#1417A8', //1
      '#DB00FF', //2
      '#DB00FF', //3
      '#DB00FF', //4
      '#DB00FF', //5
      '#DB00FF', //6
      '#DB00FF', //7
      '#DB00FF', //8
      '#DB00FF', //9
      '#122AB0', //10
      '#1414A7', //11
      '#9F00B9', //12
      '#DB00FF', //13
      '#DB00FF', //14
      '#16031A', //15
      '#1414A7' //16
    ],
		'Covert': [
      '#eb4b4b', //0
      '#eb4b4b', //1
      '#eb4b4b', //2
      '#eb4b4b', //3
      '#eb4b4b', //4
      '#eb4b4b', //5
      '#eb4b4b', //6
      '#eb4b4b', //7
      '#eb4b4b', //8
      '#eb4b4b', //9
      '#eb4b4b', //10
      '#eb4b4b', //11
      '#eb4b4b', //12
      '#eb4b4b', //13
      '#eb4b4b', //14
      '#eb4b4b', //15
      '#eb4b4b' //16
		],
		'Contraband': [
      '#caab05', //0
      '#caab05', //1
      '#caab05', //2
      '#caab05', //3
      '#caab05', //4
      '#caab05', //5
      '#caab05', //6
      '#caab05', //7
      '#caab05', //8
      '#caab05', //9
      '#caab05', //10
      '#caab05', //11
      '#caab05', //12
      '#caab05', //13
      '#caab05', //14
      '#caab05', //15
      '#caab05' //16
		]
  })

  const rarityColors = computed(() => rarities.value[props.currentRarity])
  const classes = {
    st0: `url(#${props.currentRarity}SVGID_3)`,
    st1: `url(#${props.currentRarity}SVGID_3)`,
    st2: `url(#${props.currentRarity}SVGID_4)`,
    st3: `url(#${props.currentRarity}SVGID_5)`,
    st4: `url(#${props.currentRarity}SVGID_6)`,
    st5: `url(#${props.currentRarity}SVGID_7)`,
    st6: `url(#${props.currentRarity}SVGID_8)`,
    st7: `url(#${props.currentRarity}SVGID_9)`,
    st8: `url(#${props.currentRarity}SVGID_10)`,
    st9: `url(#${props.currentRarity}SVGID_11)`,
    st10: `url(#${props.currentRarity}SVGID_12)`,
    st11: `url(#${props.currentRarity}SVGID_13)`,
    st12: `url(#${props.currentRarity}SVGID_14)`,
    st13: `url(#${props.currentRarity}SVGID_15)`,
  }
</script>

<template>
<svg v-if="currentRarity" version="1.1" :id="`${currentRarity}Слой_1`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 148 148" style="enable-background:new 0 0 148 148;" xml:space="preserve">
<g>
	<defs>
		<rect :id="`${currentRarity}SVGID_1`" width="148" height="148"/>
	</defs>
	<clipPath :id="`${currentRarity}SVGID_2`">
		<use xlink:href="#SVGID_1`"  style="overflow:visible;"/>
	</clipPath>
	<g class="st0">
		
			<linearGradient :id="`${currentRarity}SVGID_3`" gradientUnits="userSpaceOnUse" x1="214.071" y1="108.14" x2="126.62" y2="78.625" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st1" d="M117.3,144.4L205.7-1.5h-70.1L47.2,144.4H117.3z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_4`" gradientUnits="userSpaceOnUse" x1="142.828" y1="85.3089" x2="142.828" y2="15.248" gradientTransform="matrix(1 0 0 -1 0 150)">
			<stop  offset="0" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
			<stop  offset="5.599950e-03" :style="`stop-color:${rarityColors[1]};stop-opacity:1.119990e-02`"/>
			<stop  offset="0.1874" :style="`stop-color:${rarityColors[2]};stop-opacity:0.3748`"/>
			<stop  offset="0.3359" :style="`stop-color:${rarityColors[3]};stop-opacity:0.6718`"/>
			<stop  offset="0.4438" :style="`stop-color:${rarityColors[4]};stop-opacity:0.8875`"/>
			<stop  offset="0.5" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="0.5563" :style="`stop-color:${rarityColors[6]};stop-opacity:0.8875`"/>
			<stop  offset="0.6268" :style="`stop-color:${rarityColors[7]};stop-opacity:0.7463`"/>
			<stop  offset="0.7051" :style="`stop-color:${rarityColors[8]};stop-opacity:0.5899`"/>
			<stop  offset="0.7888" :style="`stop-color:${rarityColors[9]};stop-opacity:0.4223`"/>
			<stop  offset="0.8771" :style="`stop-color:${rarityColors[10]};stop-opacity:0.2459`"/>
			<stop  offset="0.9676" :style="`stop-color:${rarityColors[11]};stop-opacity:6.475200e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st2" d="M165.3,64.3l-45.5,75.1h0.6l45.5-75.1H165.3z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_5`" gradientUnits="userSpaceOnUse" x1="189.6992" y1="151.5083" x2="122.7182" y2="38.8075" gradientTransform="matrix(1 0 0 -1 0 150)">
			<stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st3" d="M109.4,144.4L197.8-1.5h-14.5L94.9,144.4H109.4z"/>
		
			<radialGradient :id="`${currentRarity}SVGID_6`" cx="-384.3689" cy="573.5049" r="1" gradientTransform="matrix(12.1975 7.7116 47.2173 -74.6834 -22227.9629 45826.3828)" gradientUnits="userSpaceOnUse">
			<stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</radialGradient>
		<path class="st4" d="M176.9,39.7c26.6-42.2,41.9-80.4,34.2-85.2c-7.7-4.9-35.4,25.5-62,67.7s-41.9,80.4-34.2,85.2
			C122.6,112.3,150.4,82,176.9,39.7z" :fill="`url(#${currentRarity}SVGID_6)`"/>
		
			<linearGradient :id="`${currentRarity}SVGID_7`" gradientUnits="userSpaceOnUse" x1="198.2202" y1="152.3542" x2="128.0612" y2="33.8555" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st5" d="M115.7,144.4L204-1.5h-10.6l-88.4,145.9H115.7z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_8`" gradientUnits="userSpaceOnUse" x1="166.6475" y1="136.7898" x2="166.6475" y2="66.7294" gradientTransform="matrix(1 0 0 -1 0 150)">
			<stop  offset="0" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
			<stop  offset="5.599950e-03" :style="`stop-color:${rarityColors[1]};stop-opacity:1.119990e-02`"/>
			<stop  offset="0.1874" :style="`stop-color:${rarityColors[2]};stop-opacity:0.3748`"/>
			<stop  offset="0.3359" :style="`stop-color:${rarityColors[3]};stop-opacity:0.6718`"/>
			<stop  offset="0.4438" :style="`stop-color:${rarityColors[4]};stop-opacity:0.8875`"/>
			<stop  offset="0.5" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="0.5563" :style="`stop-color:${rarityColors[6]};stop-opacity:0.8875`"/>
			<stop  offset="0.6268" :style="`stop-color:${rarityColors[7]};stop-opacity:0.7463`"/>
			<stop  offset="0.7051" :style="`stop-color:${rarityColors[8]};stop-opacity:0.5899`"/>
			<stop  offset="0.7888" :style="`stop-color:${rarityColors[9]};stop-opacity:0.4223`"/>
			<stop  offset="0.8771" :style="`stop-color:${rarityColors[10]};stop-opacity:0.2459`"/>
			<stop  offset="0.9676" :style="`stop-color:${rarityColors[11]};stop-opacity:6.475200e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st6" d="M187,12.8l-45.5,75.1h4.7l45.5-75.1H187z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_9`" gradientUnits="userSpaceOnUse" x1="134.9678" y1="83.1464" x2="64.6485" y2="80.4988" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st7" d="M52.4,144.9L140.8-1L-25.6-2L-114,143.8L52.4,144.9z"/>
		
			<radialGradient :id="`${currentRarity}SVGID_10`" cx="-384.3693" cy="573.4973" r="1.0002" gradientTransform="matrix(12.1975 7.7116 46.9758 -74.3015 -22181.2383 45628.3867)" gradientUnits="userSpaceOnUse">
			<stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="4.526420e-02" :style="`stop-color:${rarityColors[12]};stop-opacity:0.9547`" />
			<stop  offset="0.3044" :style="`stop-color:${rarityColors[13]};stop-opacity:0.6956`"/>
			<stop  offset="0.5386" :style="`stop-color:${rarityColors[14]};stop-opacity:0.4614`"/>
			<stop  offset="0.7399" :style="`stop-color:${rarityColors[15]};stop-opacity:0.2601`"/>
			<stop  offset="0.9004" :style="`stop-color:${rarityColors[16]};stop-opacity:9.962660e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</radialGradient>
		<path class="st8" d="M84.8,61.3c26.6-42.2,41.9-80.4,34.2-85.2c-7.7-4.9-35.4,25.5-62,67.7S15.2,124.1,22.8,129
			C30.5,133.8,58.2,103.6,84.8,61.3z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_11`" gradientUnits="userSpaceOnUse" x1="116.1613" y1="149.0544" x2="45.2759" y2="36.7274" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st9" d="M104.1-1.5L15.7,144.4h23.6L127.7-1.5H104.1z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_12`" gradientUnits="userSpaceOnUse" x1="119.5606" y1="149.0504" x2="48.6757" y2="36.7234" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st10" d="M107.5-1.5L19.1,144.4h23.6L131.1-1.5H107.5z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_13`" gradientUnits="userSpaceOnUse" x1="85.2166" y1="113.1262" x2="85.2166" y2="43.066" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
			<stop  offset="5.599950e-03" :style="`stop-color:${rarityColors[1]};stop-opacity:1.119990e-02`"/>
			<stop  offset="0.1874" :style="`stop-color:${rarityColors[2]};stop-opacity:0.3748`"/>
			<stop  offset="0.3359" :style="`stop-color:${rarityColors[3]};stop-opacity:0.6718`"/>
			<stop  offset="0.4438" :style="`stop-color:${rarityColors[4]};stop-opacity:0.8875`"/>
			<stop  offset="0.5" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="0.5563" :style="`stop-color:${rarityColors[6]};stop-opacity:0.8875`"/>
			<stop  offset="0.6268" :style="`stop-color:${rarityColors[7]};stop-opacity:0.7463`"/>
			<stop  offset="0.7051" :style="`stop-color:${rarityColors[8]};stop-opacity:0.5899`"/>
			<stop  offset="0.7888" :style="`stop-color:${rarityColors[9]};stop-opacity:0.4223`"/>
			<stop  offset="0.8771" :style="`stop-color:${rarityColors[10]};stop-opacity:0.2459`"/>
			<stop  offset="0.9676" :style="`stop-color:${rarityColors[11]};stop-opacity:6.475200e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st11" d="M106.4,36.4l-45.5,75.1h3.1l45.5-75.1H106.4z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_14`" gradientUnits="userSpaceOnUse" x1="76.1698" y1="142.2823" x2="76.1698" y2="72.2219" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
			<stop  offset="5.599950e-03" :style="`stop-color:${rarityColors[1]};stop-opacity:1.119990e-02`"/>
			<stop  offset="0.1874" :style="`stop-color:${rarityColors[2]};stop-opacity:0.3748`"/>
			<stop  offset="0.3359" :style="`stop-color:${rarityColors[3]};stop-opacity:0.6718`"/>
			<stop  offset="0.4438" :style="`stop-color:${rarityColors[4]};stop-opacity:0.8875`"/>
			<stop  offset="0.5" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="0.5563" :style="`stop-color:${rarityColors[6]};stop-opacity:0.8875`"/>
			<stop  offset="0.6268" :style="`stop-color:${rarityColors[7]};stop-opacity:0.7463`"/>
			<stop  offset="0.7051" :style="`stop-color:${rarityColors[8]};stop-opacity:0.5899`"/>
			<stop  offset="0.7888" :style="`stop-color:${rarityColors[9]};stop-opacity:0.4223`"/>
			<stop  offset="0.8771" :style="`stop-color:${rarityColors[10]};stop-opacity:0.2459`"/>
			<stop  offset="0.9676" :style="`stop-color:${rarityColors[11]};stop-opacity:6.475200e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st12" d="M98.1,7.3L52.6,82.3h1.6L99.7,7.3H98.1z"/>
		
			<linearGradient :id="`${currentRarity}SVGID_15`" gradientUnits="userSpaceOnUse" x1="117.1602" y1="149.5224" x2="117.1602" y2="79.4619" gradientTransform="matrix(1 0 0 -1 0 150)">
      <stop  offset="0" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
			<stop  offset="5.599950e-03" :style="`stop-color:${rarityColors[1]};stop-opacity:1.119990e-02`"/>
			<stop  offset="0.1874" :style="`stop-color:${rarityColors[2]};stop-opacity:0.3748`"/>
			<stop  offset="0.3359" :style="`stop-color:${rarityColors[3]};stop-opacity:0.6718`"/>
			<stop  offset="0.4438" :style="`stop-color:${rarityColors[4]};stop-opacity:0.8875`"/>
			<stop  offset="0.5" :style="`stop-color:${rarityColors[5]};`"/>
			<stop  offset="0.5563" :style="`stop-color:${rarityColors[6]};stop-opacity:0.8875`"/>
			<stop  offset="0.6268" :style="`stop-color:${rarityColors[7]};stop-opacity:0.7463`"/>
			<stop  offset="0.7051" :style="`stop-color:${rarityColors[8]};stop-opacity:0.5899`"/>
			<stop  offset="0.7888" :style="`stop-color:${rarityColors[9]};stop-opacity:0.4223`"/>
			<stop  offset="0.8771" :style="`stop-color:${rarityColors[10]};stop-opacity:0.2459`"/>
			<stop  offset="0.9676" :style="`stop-color:${rarityColors[11]};stop-opacity:6.475200e-02`"/>
			<stop  offset="1" :style="`stop-color:${rarityColors[0]};stop-opacity:0`"/>
		</linearGradient>
		<path class="st13" d="M139.6,0.1L94.1,75.1h0.6l45.5-75.1H139.6z" />
	</g>
</g>
</svg>
</template>
<style scoped>
	.st0{clip-path:v-bind('classes.st0');}
	.st1{opacity:0.5;fill:v-bind('classes.st1');enable-background:new    ;}
	.st2{opacity:0.4;fill:v-bind('classes.st2');enable-background:new    ;}
	.st3{opacity:0.5;fill:v-bind('classes.st3');enable-background:new    ;}
	.st4{opacity:0.5;fill:v-bind('classes.st4');enable-background:new    ;}
	.st5{fill:v-bind('classes.st5');}
	.st6{opacity:0.7;fill:v-bind('classes.st6');enable-background:new    ;}
	.st7{opacity:0.5;fill:v-bind('classes.st7');enable-background:new    ;}
	.st8{opacity:0.5;fill:v-bind('classes.st8');enable-background:new    ;}
	.st9{opacity:0.3;fill:v-bind('classes.st9');enable-background:new    ;}
	.st10{opacity:0.8;fill:v-bind('classes.st10');enable-background:new    ;}
	.st11{opacity:0.7;fill:v-bind('classes.st11');enable-background:new    ;}
	.st12{opacity:0.7;fill:v-bind('classes.st12');enable-background:new    ;}
	.st13{opacity:0.7;fill:v-bind('classes.st13');enable-background:new    ;}
</style>