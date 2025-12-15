const calculateAverageEnergyPercentForOneDay = require('./calculateAverageEnergyPercentForOneDay.js');

const testDayData = [
	{
		from: '2025-12-10T00:00Z',
		to: '2025-12-10T00:30Z',
		generationmix: [
			{
				fuel: 'biomass',
				perc: 3.1,
			},
			{
				fuel: 'coal',
				perc: 0,
			},
			{
				fuel: 'imports',
				perc: 7.6,
			},
			{
				fuel: 'gas',
				perc: 9,
			},
			{
				fuel: 'nuclear',
				perc: 11.2,
			},
			{
				fuel: 'other',
				perc: 0,
			},
			{
				fuel: 'hydro',
				perc: 0,
			},
			{
				fuel: 'solar',
				perc: 0,
			},
			{
				fuel: 'wind',
				perc: 69,
			},
		],
	},
	{
		from: '2025-12-10T00:30Z',
		to: '2025-12-10T01:00Z',
		generationmix: [
			{
				fuel: 'biomass',
				perc: 3.4,
			},
			{
				fuel: 'coal',
				perc: 0,
			},
			{
				fuel: 'imports',
				perc: 5.5,
			},
			{
				fuel: 'gas',
				perc: 9.8,
			},
			{
				fuel: 'nuclear',
				perc: 11.4,
			},
			{
				fuel: 'other',
				perc: 0,
			},
			{
				fuel: 'hydro',
				perc: 0,
			},
			{
				fuel: 'solar',
				perc: 0,
			},
			{
				fuel: 'wind',
				perc: 69.9,
			},
		],
	},
	{
		from: '2025-12-10T01:00Z',
		to: '2025-12-10T01:30Z',
		generationmix: [
			{
				fuel: 'biomass',
				perc: 3.5,
			},
			{
				fuel: 'coal',
				perc: 0,
			},
			{
				fuel: 'imports',
				perc: 5.9,
			},
			{
				fuel: 'gas',
				perc: 8.9,
			},
			{
				fuel: 'nuclear',
				perc: 11.5,
			},
			{
				fuel: 'other',
				perc: 0,
			},
			{
				fuel: 'hydro',
				perc: 0,
			},
			{
				fuel: 'solar',
				perc: 0,
			},
			{
				fuel: 'wind',
				perc: 70.1,
			},
		],
	},
	{
		from: '2025-12-10T01:30Z',
		to: '2025-12-10T02:00Z',
		generationmix: [
			{
				fuel: 'biomass',
				perc: 3.3,
			},
			{
				fuel: 'coal',
				perc: 0,
			},
			{
				fuel: 'imports',
				perc: 6.3,
			},
			{
				fuel: 'gas',
				perc: 8.6,
			},
			{
				fuel: 'nuclear',
				perc: 11.4,
			},
			{
				fuel: 'other',
				perc: 0,
			},
			{
				fuel: 'hydro',
				perc: 0,
			},
			{
				fuel: 'solar',
				perc: 0,
			},
			{
				fuel: 'wind',
				perc: 70.3,
			},
		],
	},
];

const outputData = {
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

test('Clculates average energy percent for one day', () => {
	expect(calculateAverageEnergyPercentForOneDay(testDayData)).toStrictEqual(outputData);
});
