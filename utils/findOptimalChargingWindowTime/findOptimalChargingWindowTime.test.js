const findOptimalChargingWindowTime = require('./findOptimalChargingWindowTime');

test('Finds optimal charging window time', () => {
	const inputData = [
		{
			from: '2024-01-14T23:00',
			to: '2024-01-14T23:30',
			generationmix: [
				{ fuel: 'wind', perc: 50 },
				{ fuel: 'solar', perc: 50 },
			],
		},
		{
			from: '2024-01-14T23:30',
			to: '2024-01-15T00:00',
			generationmix: [
				{ fuel: 'wind', perc: 50 },
				{ fuel: 'solar', perc: 40 },
				{ fuel: 'gas', perc: 10 },
			],
		},
		{
			from: '2024-01-15T00:00',
			to: '2024-01-15T00:30',
			generationmix: [
				{ fuel: 'wind', perc: 50 },
				{ fuel: 'solar', perc: 40 },
				{ fuel: 'gas', perc: 10 },
			],
		},
		{
			from: '2024-01-15T00:30',
			to: '2024-01-15T01:00',
			generationmix: [
				{ fuel: 'wind', perc: 30 },
				{ fuel: 'solar', perc: 60 },
				{ fuel: 'gas', perc: 10 },
			],
		},
		{
			from: '2024-01-15T01:00',
			to: '2024-01-15T01:30',
			generationmix: [
				{ fuel: 'wind', perc: 50 },
				{ fuel: 'solar', perc: 30 },
				{ fuel: 'gas', perc: 20 },
			],
		},
		{
			from: '2024-01-15T01:30',
			to: '2024-01-15T02:00',
			generationmix: [
				{ fuel: 'wind', perc: 60 },
				{ fuel: 'solar', perc: 30 },
				{ fuel: 'gas', perc: 10 },
			],
		},
		{
			from: '2024-01-15T02:00',
			to: '2024-01-15T02:30',
			generationmix: [
				{ fuel: 'wind', perc: 30 },
				{ fuel: 'solar', perc: 20 },
				{ fuel: 'gas', perc: 50 },
			],
		},
		{
			from: '2024-01-15T02:30',
			to: '2024-01-15T03:00',
			generationmix: [
				{ fuel: 'wind', perc: 10 },
				{ fuel: 'solar', perc: 10 },
				{ fuel: 'gas', perc: 80 },
			],
		},
		{
			from: '2024-01-15T03:00',
			to: '2024-01-15T03:30',
			generationmix: [
				{ fuel: 'wind', perc: 10 },
				{ fuel: 'solar', perc: 30 },
				{ fuel: 'gas', perc: 60 },
			],
		},
		{
			from: '2024-01-15T03:30',
			to: '2024-01-15T04:00',
			generationmix: [
				{ fuel: 'wind', perc: 10 },
				{ fuel: 'solar', perc: 20 },
				{ fuel: 'gas', perc: 70 },
			],
		},
		{
			from: '2024-01-15T04:00',
			to: '2024-01-15T04:30',
			generationmix: [
				{ fuel: 'wind', perc: 10 },
				{ fuel: 'solar', perc: 10 },
				{ fuel: 'gas', perc: 80 },
			],
		},
	];

	const outputData = {
		start: { date: '14.01.2024', time: '23:00' },
		end: { date: '15.01.2024', time: '02:00' },
		averageCleanEnergyPercent: 90,
	};

	const windowHours = 3;

	const result = findOptimalChargingWindowTime(inputData, windowHours);

	expect(result).toHaveProperty('start');
	expect(result).toHaveProperty('end');
	expect(result).toHaveProperty('averageCleanEnergyPercent');
	expect(result.start).toHaveProperty('date');
	expect(result.start).toHaveProperty('time');
	expect(result.end).toHaveProperty('date');
	expect(result.end).toHaveProperty('time');
	expect(result).toEqual(outputData);
});
