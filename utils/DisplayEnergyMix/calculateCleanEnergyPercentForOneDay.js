const CLEAN_ENERGY_TYPES = require('../../constants.js');

module.exports = function calculateCleanEnergyPercentForOneDay(energyData) {
	let cleanEnergyPercent = 0;
	for (const key in energyData) {
		if (CLEAN_ENERGY_TYPES.includes(key)) {
			cleanEnergyPercent += energyData[key];
		}
	}
	return Number(cleanEnergyPercent.toFixed(1));
};
