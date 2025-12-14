module.exports = function calculateAverageEnergyPercentForOneDay(dayData) {
	const sums = {};

	dayData.forEach((interval) => {
		interval.generationmix.forEach((source) => {
			const { fuel, perc } = source;
			if (!sums[fuel]) sums[fuel] = 0;
			sums[fuel] += perc;
		});
	});

	const averages = {};
	const count = dayData.length;

	for (const fuel of Object.keys(sums)) {
		averages[fuel] = Number((sums[fuel] / count).toFixed(1));
	}

	return averages;
};
