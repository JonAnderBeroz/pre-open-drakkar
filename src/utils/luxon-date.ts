import {DateTime, Duration, DurationLikeObject} from "luxon";

export const getDateDifference = (
  endDate: DateTime,
  startDate: DateTime,
  shiftTo: (keyof DurationLikeObject)[],
): Duration => {
  return endDate.diff(startDate).shiftTo(...shiftTo);
};
