import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

export const diffForHumans = (leftDate, rightDate) => {
  let diff = 0;
  const diffYears = differenceInYears(leftDate, rightDate);
  const diffMonths = differenceInMonths(leftDate, rightDate);
  const diffWeeks = differenceInWeeks(leftDate, rightDate);
  const diffDays = differenceInDays(leftDate, rightDate);
  const diffHours = differenceInHours(leftDate, rightDate);
  const diffMinutes = differenceInMinutes(leftDate, rightDate);
  if (diffMinutes) {
    diff = `${diffMinutes} minutes`;
  }
  if (diffHours) {
    diff = `${diffHours} hour`;
  }
  if (diffDays) {
    diff = `${diffDays} days`;
  }
  if (diffWeeks) {
    diff = `${diffWeeks} weeks`;
  }
  if (diffMonths) {
    diff = `${diffMonths} months`;
  }
  if (diffYears) {
    diff = `${diffYears} years`;
  }

  return diff;
};
