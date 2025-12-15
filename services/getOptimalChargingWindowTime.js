const getUTCThreeNextDaysDateUTS = require('../utils/DisplayEnergyMix/getUTCThreeNextDaysDate.js');
const findOptimalChargingWindowTime = require('../utils/findOptimalChargingWindowTime/findOptimalChargingWindowTime.js');

const getOptimalChargingWindowTime = async (req, res) => {
	if (!(1 <= req.query.hours) && !(req.query.hours <= 6)) {
		return res.status(400).json({
			error: 'Missing hours parameter',
		});
	}
	const windowHours = req.query.hours;
	const { tomorrowUTC, dayAfterTomorrowUTC } = getUTCThreeNextDaysDateUTS();

	try {
		const response = await fetch(
			`https://api.carbonintensity.org.uk/generation/${tomorrowUTC}T00:30/${dayAfterTomorrowUTC}T24:00`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}
		);

		const { data } = await response.json();
		const forecastData = data;

		const result = findOptimalChargingWindowTime(forecastData, windowHours);

		res.json(result);
	} catch (error) {
		console.error('Failed to fetch data', error);
		res.status(500).json({
			error: 'Failed to fetch data',
			message: error.message,
		});
	}
};

module.exports = getOptimalChargingWindowTime;
