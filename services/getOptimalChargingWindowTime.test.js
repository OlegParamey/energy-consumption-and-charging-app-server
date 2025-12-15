const getOptimalChargingWindowTime = require('./getOptimalChargingWindowTime');
const getUTCThreeNextDaysDateUTS = require('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');

jest.mock('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');

global.fetch = jest.fn();

test('Returns optimal charging window time', async () => {
	const mockReq = {
		query: { hours: 2 },
	};

	const mockRes = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis(),
	};

	getUTCThreeNextDaysDateUTS.mockReturnValue({
		tomorrowUTC: '2024-01-16',
		dayAfterTomorrowUTC: '2024-01-17',
	});

	const mockApiResponse = {
		data: [
			{
				from: '2024-01-16T00:30',
				to: '2024-01-16T01:00',
				generationmix: [
					{ fuel: 'wind', perc: 40 },
					{ fuel: 'solar', perc: 30 },
				],
			},
			{
				from: '2024-01-16T01:00',
				to: '2024-01-16T01:30',
				generationmix: [
					{ fuel: 'wind', perc: 50 },
					{ fuel: 'solar', perc: 20 },
				],
			},
			{
				from: '2024-01-16T01:30',
				to: '2024-01-16T02:00',
				generationmix: [
					{ fuel: 'wind', perc: 60 },
					{ fuel: 'solar', perc: 25 },
				],
			},
			{
				from: '2024-01-16T02:00',
				to: '2024-01-16T02:30',
				generationmix: [
					{ fuel: 'wind', perc: 55 },
					{ fuel: 'solar', perc: 30 },
				],
			},
		],
	};

	fetch.mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockApiResponse),
	});

	await getOptimalChargingWindowTime(mockReq, mockRes);

	expect(mockRes.json).toHaveBeenCalled();
	expect(mockRes.json.mock.calls[0][0]).toHaveProperty('start');
	expect(mockRes.json.mock.calls[0][0]).toHaveProperty('end');
	expect(mockRes.json.mock.calls[0][0]).toHaveProperty('averageCleanEnergyPercent');
});
