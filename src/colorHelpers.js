import chroma from 'chroma-js';
const levels = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];

function generatePalette(starterPalette) {
	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
		colors: {}
	};

	// Create empty array on newPalette object with level name
	for (let level of levels) {
		newPalette.colors[level] = [];
	}

	//For each original color in starter palette, generate scale of
	for (let color of starterPalette.colors) {
		// Generate scale of 10 colors
		let scale = generateScale(color.color, 10).reverse();
		// For each color in scale push into newPalette all end values. Color.name comes from starterPalette
		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${color.name} ${levels[i]}`,
				id: color.name.toLowerCase(),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i])
					.css()
					.replace('rgb', 'rgba')
					.replace(')', ',1.0)')
			});
		}
	}
	return newPalette;
}

// Generate array of dark color, original color, and white
function getRange(hexColor) {
	const end = '#fff';
	return [ chroma(hexColor).darken(1.4).hex(), hexColor, end ];
}

// Generate scale of colors with mode 'lab' for better gradient blending
function generateScale(hexColor, numberOfColors) {
	return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

export { generatePalette };
