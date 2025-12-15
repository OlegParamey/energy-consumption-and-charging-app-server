const getEnergyDataForThreeDays = require('./getEnergyDataForThreeDays.js');

jest.mock('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');
jest.mock('../utils/DisplayEnergyMix/splitDataByThreeDays.js');
jest.mock('../utils/DisplayEnergyMix/calculateCleanEnergyPercentForOneDay.js');
jest.mock('../utils/DisplayEnergyMix/calculateAverageEnergyPercentForOneDay.js');

const getUTCThreeNextDaysDateUTS = require('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');
const splitDataByThreeDays = require('../utils/DisplayEnergyMix/splitDataByThreeDays.js');
const calculateCleanEnergyPercentForOneDay = require('../utils/DisplayEnergyMix/calculateCleanEnergyPercentForOneDay.js');
const calculateAverageEnergyPercentForOneDay = require('../utils/DisplayEnergyMix/calculateAverageEnergyPercentForOneDay.js');

global.fetch = jest.fn();

test('Returns energy data for three days', async () => {
	getUTCThreeNextDaysDateUTS.mockReturnValue({
		todayUTC: '2024-01-15',
		tomorrowUTC: '2024-01-16',
		dayAfterTomorrowUTC: '2024-01-17',
	});

	const mockApiData = [{ some: 'data' }];

	fetch.mockResolvedValue({
		json: jest.fn().mockResolvedValue({ data: mockApiData }),
	});

	const todayData = [{ t: 1 }];
	const tomorrowData = [{ t: 2 }];
	const dayAfterTomorrowData = [{ t: 3 }];

	splitDataByThreeDays.mockReturnValue({
		todayData,
		tomorrowData,
		dayAfterTomorrowData,
	});

	calculateAverageEnergyPercentForOneDay
		.mockReturnValueOnce('avg-today')
		.mockReturnValueOnce('avg-tomorrow')
		.mockReturnValueOnce('avg-day-after');

	calculateCleanEnergyPercentForOneDay
		.mockReturnValueOnce('50')
		.mockReturnValueOnce('60')
		.mockReturnValueOnce('70');

	const res = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis(),
	};

	await getEnergyDataForThreeDays({}, res);

	expect(fetch).toHaveBeenCalledTimes(1);

	expect(splitDataByThreeDays).toHaveBeenCalledWith(mockApiData, {
		todayUTC: '2024-01-15',
		tomorrowUTC: '2024-01-16',
		dayAfterTomorrowUTC: '2024-01-17',
	});

	expect(res.json).toHaveBeenCalledWith([
		{
			dayKey: 'today',
			cleanEnergyPercent: '50',
			generationMix: 'avg-today',
		},
		{
			dayKey: 'tomorrow',
			cleanEnergyPercent: '60',
			generationMix: 'avg-tomorrow',
		},
		{
			dayKey: 'day-after-tomorrow',
			cleanEnergyPercent: '70',
			generationMix: 'avg-day-after',
		},
	]);
});
