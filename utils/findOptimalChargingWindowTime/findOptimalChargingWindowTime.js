const CLEAN_ENERGY_TYPES = require('../../constants.js');

module.exports = function findOptimalChargingWindowTime(forecastData, windowHours) {
	const intervalsCleanEnergy = calculateCleanEnergyForInterval(forecastData);

	const intervalsInWindow = windowHours * 2;

	let maxAverage = -1;
	let bestWindow = null;

	for (let i = 0; i <= intervalsCleanEnergy.length - intervalsInWindow; i++) {
		const windowSlice = intervalsCleanEnergy.slice(i, i + intervalsInWindow);

		const averageClean =
			windowSlice.reduce((sum, interval) => sum + interval.cleanEnergyPercent, 0) /
			windowSlice.length;

		if (averageClean > maxAverage) {
			maxAverage = averageClean;
			bestWindow = {
				start: windowSlice[0].from,
				end: windowSlice[windowSlice.length - 1].to,
				average: averageClean,
			};
		}
	}

	return {
		start: {
			date: formatDate(bestWindow.start),
			time: formatTime(bestWindow.start),
		},
		end: {
			date: formatDate(bestWindow.end),
			time: formatTime(bestWindow.end),
		},
		averageCleanEnergyPercent: Number(bestWindow.average.toFixed(2)),
	};
};

function calculateCleanEnergyForInterval(forecastData) {
	return forecastData.map((interval) => {
		const cleanEnergyPercent = interval.generationmix
			.filter((gen) => CLEAN_ENERGY_TYPES.includes(gen.fuel))
			.reduce((sum, gen) => sum + gen.perc, 0);

		return {
			from: new Date(interval.from),
			to: new Date(interval.to),
			cleanEnergyPercent: cleanEnergyPercent,
		};
	});
}

function formatDate(date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
}

function formatTime(date) {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}
