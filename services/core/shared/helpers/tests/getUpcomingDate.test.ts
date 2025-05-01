import {getUpcomingDateFrom} from '../getUpcomingDate'

const currentDate = new Date(2024, 9, 1)

test('returns the next date if this date has already passed from the specified date', () => {
  expect(getUpcomingDateFrom(new Date(2024, 1, 1), currentDate)).toStrictEqual(new Date(2025, 1, 1));
  expect(getUpcomingDateFrom(new Date(2023, 1, 1), currentDate)).toStrictEqual(new Date(2025, 1, 1));
  expect(getUpcomingDateFrom(new Date(2007, 1, 1), currentDate)).toStrictEqual(new Date(2025, 1, 1));

  expect(getUpcomingDateFrom(new Date(2024, 5, 16), currentDate)).toStrictEqual(new Date(2025, 5, 16));
  expect(getUpcomingDateFrom(new Date(2024, 8, 21), currentDate)).toStrictEqual(new Date(2025, 8, 21));
});

test('returns the same date if this date is upcoming from the specified date', () => {
  expect(getUpcomingDateFrom(new Date(2024, 10, 25), currentDate)).toStrictEqual(new Date(2024, 10, 25));
  expect(getUpcomingDateFrom(new Date(2025, 1, 1), currentDate)).toStrictEqual(new Date(2025, 1, 1));
  expect(getUpcomingDateFrom(new Date(2025, 10, 15), currentDate)).toStrictEqual(new Date(2025, 10, 15));
  expect(getUpcomingDateFrom(new Date(2030, 10, 15), currentDate)).toStrictEqual(new Date(2030, 10, 15));
});
