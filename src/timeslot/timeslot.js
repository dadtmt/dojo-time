import { Interval } from "luxon";

export const createTimeSlot = time => ({
  available: true,
  time
});

export const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

export const checkTimeSlotAvaibility = (timeslot, bookings) => {
  bookings.forEach(booking => {
    if (booking.overlaps(timeslot.time)) {
      timeslot.available = false;
    }
  });
  return timeslot;
};
