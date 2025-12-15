const calculateCleanEnergyPercentForOneDay = require('./calculateCleanEnergyPercentForOneDay.js');

const inputData = {
	biomass: 3.3,
	coal: 0,
	imports: 6.3,
	gas: 9.1,
	nuclear: 11.4,
	other: 0,
	hydro: 0,
	solar: 0,
	wind: 69.8,
};

const outputData = 84.5;

test('Calculates clean energy percent for one day', () => {
	expect(calculateCleanEnergyPercentForOneDay(inputData)).toBe(outputData);
});
