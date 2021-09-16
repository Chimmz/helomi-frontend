export const dateTimeFormat = (timestamp, options) =>
   new Intl.DateTimeFormat(window.navigator.language, options).format(
      timestamp
   );

export const getDaysPassed = (date1, date2) => {
   return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
};

export const getMsgSentTime = timestamp => {
   const formatOptions = { hour: 'numeric', hour12: true, minute: 'numeric' };
   const numDaysPassed = Math.round(
      getDaysPassed(new Date(timestamp), new Date())
   );

   if (numDaysPassed < 1) return dateTimeFormat(timestamp, formatOptions);
   if (numDaysPassed === 1)
      return ['Yesterday', dateTimeFormat(timestamp, formatOptions)].join(', ');

   if (numDaysPassed <= 7)
      return `${dateTimeFormat(timestamp, { weekday: 'short' })}, 
         ${dateTimeFormat(timestamp, formatOptions)}`;

   return dateTimeFormat(timestamp, {
      ...formatOptions,
      day: 'numeric',
      month: 'short'
   });
};
