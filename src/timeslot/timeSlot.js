export const createTimeSlot = time => ({
  available: true,
  time
});

export const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

export const checkTimeSlotAvaibility = (timeSlot, bookings) => {
  for (let booking of bookings) {
    if (booking.overlaps(timeSlot.time)) {
      timeSlot.available = false;
      break;
    }
  }

  return timeSlot;
};

//TODO checkDayTimeSlotsAvaibility
