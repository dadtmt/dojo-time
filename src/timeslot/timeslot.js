import { Interval } from "luxon";

export const createTimeSlot = time => ({
  available: true,
  time
});

export const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

export const checkTimeSlotAvaibility = (timeslot, bookings, duration) => {
  bookings.forEach(booking => {
    if (booking.overlaps(Interval.after(timeslot.time.start, duration))) {
      timeslot.available = false;
    }
  });

  return timeslot;
};

export const checkTimeSlotsAvaibility = (timeSlots, bookings, duration) =>
  timeSlots.map(timeSlot =>
    checkTimeSlotAvaibility(timeSlot, bookings, duration)
  );
