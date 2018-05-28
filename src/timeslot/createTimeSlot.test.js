import createTimeSlot from "./createTimeSlot";
import moment from "moment";

describe.only("createTimeSlot", () => {
  it("should have time (luxon intervel) and available (true) properties", () => {
    const jeudi = moment({ year: 2018, month: 4, day: 24, hour: 12 });

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

const createDayTimeSlots = (startTime, endTime) => {
  const arrayTime = [];
  for (let t = startTime; t < endTime; t.add(15, "minutes")) {
    arrayTime.push(createTimeSlot(t.clone()));
  }
  return arrayTime;
};

describe("createDayTimeSlots", () => {
  it("should return an array of timeslots", () => {
    const expected = [
      {
        available: true,
        time: moment({
          day: 23,
          month: 4,
          hour: 14,
          minute: 0,
          year: 2018
        })
      },
      {
        available: true,
        time: moment({
          day: 23,
          month: 4,
          hour: 14,
          minute: 15,
          year: 2018
        })
      },
      {
        available: true,
        time: moment({
          day: 23,
          month: 4,
          hour: 14,
          minute: 30,
          year: 2018
        })
      },
      {
        available: true,
        time: moment({
          day: 23,
          month: 4,
          hour: 14,
          minute: 45,
          year: 2018
        })
      }
    ];

    const startTime = moment({
      day: 23,
      month: 4,
      hour: 14,
      minute: 0,
      year: 2018
    });
    const endTime = moment({
      day: 23,
      month: 4,
      hour: 15,
      minute: 0,
      year: 2018
    });
    expect(createDayTimeSlots(startTime, endTime)).toEqual(expected);
  });
});

// describe("setDayTimeSlotsAvaibilities", () => {
//   it("check if a timeSlot is available according to a bookings array", () => {
//     const bookings = [
//       {
//         startTime: moment({
//           day: 23,
//           month: 4,
//           hour: 15,
//           minute: 20,
//           year: 2018
//         }),
//         duration :
//       }
//     ];
//   });
// });
