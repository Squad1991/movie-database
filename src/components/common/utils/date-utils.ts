/**
 * Tells how long ago the date was in human readable format (e.g. 1 hour ago)
 */

export function timeAgo(input: Date | string | number) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = [
    ['years', 3600 * 24 * 365],
    ['months', 3600 * 24 * 30],
    ['weeks', 3600 * 24 * 7],
    ['days', 3600 * 24],
    ['hours', 3600],
    ['minutes', 60],
    ['seconds', 1],
  ] as const;
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;
      return formatter.format(Math.round(delta), rangeType);
    }
  }
  return 'just now';
}

/** Formats the date in long format (e.g. 2022-01-01 => 1 January 2022) */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
  }).format(date);
};

/**
 * Formats the time in hours and minutes  (e.g. 115 minutes => 1h 55m)
 */

export function convertTimeInHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes - hours * 60);
  return `${hours}h ${minutes}m`;
}
