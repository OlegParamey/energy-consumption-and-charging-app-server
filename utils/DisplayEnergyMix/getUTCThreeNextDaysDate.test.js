const getUTCThreeNextDaysDate = require('./getUTCThreeNextDaysDate');

jest.useFakeTimers();
jest.setSystemTime(new Date('2024-05-10T12:00:00Z'));

test('returns today, tomorrow and day after tomorrow in UTC', () => {
	const result = getUTCThreeNextDaysDate();

	expect(result).toEqual({
		todayUTC: '2024-05-10',
		tomorrowUTC: '2024-05-11',
		dayAfterTomorrowUTC: '2024-05-12',
	});
});

afterAll(() => {
	jest.useRealTimers();
});
