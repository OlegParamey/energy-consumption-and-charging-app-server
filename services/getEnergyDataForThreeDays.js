const getUTCThreeNextDaysDateUTS = require('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');
const splitDataByThreeDays = require('../utils/DisplayEnergyMix/splitDataByThreeDays.js');
const calculateCleanEnergyPercentForOneDay = require('../utils/DisplayEnergyMix/calculateCleanEnergyPercentForOneDay.js');
const calculateAverageEnergyPercentForOneDay = require('../utils/DisplayEnergyMix/calculateAverageEnergyPercentForOneDay.js');

const getEnergyDataForThreeDays = async (_, res) => {
	const { todayUTC, tomorrowUTC, dayAfterTomorrowUTC } = getUTCThreeNextDaysDateUTS();

	try {
		const response = await fetch(
			`https://api.carbonintensity.org.uk/generation/${todayUTC}T00:30/${dayAfterTomorrowUTC}T24:00`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}
		);

		const { data } = await response.json();
		const { todayData, tomorrowData, dayAfterTomorrowData } = splitDataByThreeDays(
			data,
			{
				todayUTC,
				tomorrowUTC,
				dayAfterTomorrowUTC,
			}
		);

		const days = [
			{ dayKey: 'today', data: todayData },
			{ dayKey: 'tomorrow', data: tomorrowData },
			{
				dayKey: 'day-after-tomorrow',
				data: dayAfterTomorrowData,
			},
		];

		const result = days.map(({ dayKey, data }) => {
			const generationMixAverageEnergyPercentForOneDay =
				calculateAverageEnergyPercentForOneDay(data);
			return {
				dayKey,
				cleanEnergyPercent: calculateCleanEnergyPercentForOneDay(
					generationMixAverageEnergyPercentForOneDay
				),
				generationMix: generationMixAverageEnergyPercentForOneDay,
			};
		});

		res.json(result);
	} catch (error) {
		console.error('Failed to fetch data', error);
		res.status(500).json({
			error: 'Failed to fetch data',
			message: error.message,
		});
	}
};

module.exports = getEnergyDataForThreeDays;
