import dayjs, {Dayjs} from 'dayjs';

const convert24TimeTo12 = (timeString: string): string => {
  const [hour, minute] = timeString.split(':');
  const suffix = Number(hour) >= 12 ? 'PM' : 'AM';
  return `${((Number(hour) + 11) % 12) + 1}:${minute} ${suffix}`;
};

const getEndDay = ({
  day = dayjs(),
  isUtc = false,
}: {
  day?: Dayjs;
  isUtc?: boolean;
}): string => {
  const calculatedDay = isUtc
    ? dayjs.utc(day.format('YYYY-MM-DD'), 'YYYY-MM-DD')
    : day;
  return calculatedDay
    .hour(23)
    .minute(59)
    .second(59)
    .millisecond(0)
    .toISOString();
};

const getStartDay = ({
  day = dayjs(),
  isUtc = false,
}: {
  day?: Dayjs;
  isUtc?: boolean;
}): string => {
  const calculatedDay = isUtc
    ? dayjs.utc(day.format('YYYY-MM-DD'), 'YYYY-MM-DD')
    : day;
  return calculatedDay.hour(0).minute(0).second(0).millisecond(0).toISOString();
};

const getNext30MinsTime = (dayForDate: Dayjs = dayjs()): string => {
  const dayForTime =
    dayjs().minute() > 30
      ? dayjs()
          .hour(dayjs().hour() + 1)
          .minute(0)
          .second(0)
          .millisecond(0)
      : dayjs().minute(30).second(0).millisecond(0);
  return dayjs(
    `${dayjs(dayForDate).format('YYYY-MM-DD')}T${dayForTime.format(
      'HH:mm:ss',
    )}`,
  ).toISOString();
};

const getNextHourTime = (dayForDate: Dayjs = dayjs()): string => {
  const dayForTime =
    dayjs().hour() !== 0
      ? dayjs()
          .hour(dayjs().hour() + 1)
          .minute(0)
          .second(0)
          .millisecond(0)
      : dayjs().minute(0).second(0).millisecond(0);
  return dayjs(
    `${dayjs(dayForDate).format('YYYY-MM-DD')}T${dayForTime.format(
      'HH:mm:ss',
    )}`,
  ).toISOString();
};

export default {
  convert24TimeTo12,
  getEndDay,
  getNext30MinsTime,
  getNextHourTime,
  getStartDay,
};
