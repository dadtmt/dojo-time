import { DateTime, Interval } from "luxon";

import {
  createDayTimeSlots,
  checkTimeSlotAvaibility,
  createTimeSlot
} from "./timeslot";

describe("createTimeSlot", () => {
  it("should have time (luxon intervel) and available (true) properties", () => {
    const jeudi = Interval.after(
      { year: 2018, month: 4, day: 24, hour: 12 },
      { minutes: 15 }
    );
    const expected = {
      available: true,
      time: jeudi
    };

    expect(createTimeSlot(jeudi)).toEqual(expected);

    const vendrediExpected = {
      available: true,
      time: "vendredi 23 mai 12H"
    };

    expect(createTimeSlot("vendredi 23 mai 12H")).toEqual(vendrediExpected);
  });
});

describe("createDayTimeSlots", () => {
  it("should return an array of timeslots", () => {
    const expected = [
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 15 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 30 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 45 },
          { minutes: 15 }
        )
      }
    ];

    const startTime = DateTime.fromObject({
      day: 24,
      month: 4,
      hour: 12,
      minute: 0,
      year: 2018
    });
    const endTime = DateTime.fromObject({
      day: 24,
      month: 4,
      hour: 13,
      minute: 0,
      year: 2018
    });
    expect(createDayTimeSlots(startTime, endTime)).toEqual(expected);
  });
});

const bookings = [
  Interval.after(
    { year: 2018, month: 4, day: 24, hour: 12, minutes: 33 },
    { minutes: 40 }
  ),
  Interval.after(
    { year: 2018, month: 4, day: 24, hour: 13, minutes: 40 },
    { minutes: 10 }
  ),
  Interval.after(
    { year: 2018, month: 4, day: 24, hour: 14, minutes: 50 },
    { minutes: 25 }
  )
];

// Start 13h15 End 13h30

const availableTimeSlot = {
  time: Interval.after(
    { year: 2018, month: 4, day: 24, hour: 13, minutes: 15 },
    { minutes: 15 }
  ),
  available: true
};

// Start 13h30 End 13h45

const unavailableTimeSlot = {
  time: Interval.after(
    { year: 2018, month: 4, day: 24, hour: 13, minutes: 30 },
    { minutes: 15 }
  ),
  available: true
};

const expectedForUnavailableTimeSlot = {
  time: Interval.after(
    { year: 2018, month: 4, day: 24, hour: 13, minutes: 30 },
    { minutes: 15 }
  ),
  available: false
};

describe("checkTimeSlotAvaibility", () => {
  it.only("should set available to false if timeslot overlaps a booking interval", () => {
    expect(checkTimeSlotAvaibility(unavailableTimeSlot, bookings)).toEqual(
      expectedForUnavailableTimeSlot
    );
  });
  it("should set available to true if timeslot not overlapping a booking interval", () => {
    expect(checkTimeSlotAvaibility(availableTimeSlot, bookings)).toEqual(
      availableTimeSlot
    );
  });
});

const checkTimeSlotsAvaibility = (timeSlots, bookings) =>
  timeSlots.map(timeSlot => checkTimeSlotAvaibility(timeSlot, bookings));
// check many timeslots

describe("checkTimeSlotsAvaibility", () => {
  it("should return timeslots with available true or false depending on bookings", () => {
    const dayTimeSlots = createDayTimeSlots(
      DateTime.fromObject({
        day: 24,
        month: 4,
        hour: 12,
        minute: 0,
        year: 2018
      }),
      DateTime.fromObject({
        day: 24,
        month: 4,
        hour: 13,
        minute: 0,
        year: 2018
      })
    );

    const expected = [
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12 },
          { minutes: 15 }
        )
      },
      {
        available: true,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 15 },
          { minutes: 15 }
        )
      },
      {
        available: false,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 30 },
          { minutes: 15 }
        )
      },
      {
        available: false,
        time: Interval.after(
          { year: 2018, month: 4, day: 24, hour: 12, minutes: 45 },
          { minutes: 15 }
        )
      }
    ];

    expect(checkTimeSlotsAvaibility(dayTimeSlots, bookings)).toEqual(expected);
  });
});
