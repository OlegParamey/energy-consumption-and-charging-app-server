module.exports = function splitDataByThreeDays(
	data,
	{ todayUTC, tomorrowUTC, dayAfterTomorrowUTC }
) {
	function getIndexOfTransitionBetweenTwoDays(dayOne, dayTwo) {
		return (
			data.findIndex(
				(obj) => obj.from.includes(dayOne) && obj.to.includes(dayTwo)
			) + 1
		);
	}

	const todaySlice = data.slice(
		0,
		getIndexOfTransitionBetweenTwoDays(todayUTC, tomorrowUTC)
	);

	const tomorrowSlice = data.slice(
		getIndexOfTransitionBetweenTwoDays(todayUTC, tomorrowUTC),
		getIndexOfTransitionBetweenTwoDays(tomorrowUTC, dayAfterTomorrowUTC)
	);
	const dayAfterTomorrowSlice = data.slice(
		getIndexOfTransitionBetweenTwoDays(tomorrowUTC, dayAfterTomorrowUTC)
	);

	return {
		todayData: todaySlice,
		tomorrowData: tomorrowSlice,
		dayAfterTomorrowData: dayAfterTomorrowSlice,
	};
};
