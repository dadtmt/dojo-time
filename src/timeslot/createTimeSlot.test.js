import createTimeSlot from "./createTimeSlot";
import moment from "moment";
import { DateTime, Interval } from "luxon";

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

const createDayTimeSlots = (startTime, endTime) =>
  Interval.fromDateTimes(startTime, endTime)
    .splitBy({ minutes: 15 })
    .map(interval => createTimeSlot(interval));

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
