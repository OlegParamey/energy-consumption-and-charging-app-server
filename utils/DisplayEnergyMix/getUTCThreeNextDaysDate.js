module.exports = function getThreeNextDaysDateUTS() {
	const now = new Date();
	const todayUTC = now.toISOString().split('T')[0];

	const tomorrow = new Date();
	tomorrow.setDate(now.getDate() + 1);
	const tomorrowUTC = tomorrow.toISOString().split('T')[0];

	const dayAfterTomorrow = new Date();
	dayAfterTomorrow.setDate(now.getDate() + 2);
	const dayAfterTomorrowUTC = dayAfterTomorrow.toISOString().split('T')[0];

	return { todayUTC, tomorrowUTC, dayAfterTomorrowUTC };
};
