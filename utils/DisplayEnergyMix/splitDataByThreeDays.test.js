const splitDataByThreeDays = require('./splitDataByThreeDays');

test('Splits three days in three arrays', () => {
	const todayUTC = '2024-01-15';
	const tomorrowUTC = '2024-01-16';
	const dayAfterTomorrowUTC = '2024-01-17';

	const inputData = [
		{ from: '2024-01-15T00:00', to: '2024-01-15T03:00' },
		{ from: '2024-01-15T03:00', to: '2024-01-15T06:00' },
		{ from: '2024-01-15T21:00', to: '2024-01-16T00:00' },
		{ from: '2024-01-16T00:00', to: '2024-01-16T03:00' },
		{ from: '2024-01-16T21:00', to: '2024-01-17T00:00' },
		{ from: '2024-01-17T00:00', to: '2024-01-17T03:00' },
	];

	const result = splitDataByThreeDays(inputData, {
		todayUTC,
		tomorrowUTC,
		dayAfterTomorrowUTC,
	});

	expect(result.todayData).toHaveLength(3);
	expect(result.tomorrowData).toHaveLength(2);
	expect(result.dayAfterTomorrowData).toHaveLength(1);
});
