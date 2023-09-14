import moment from "moment";

export const TimeDiff = (dateStr: string) => {
  const inputDate = moment(dateStr);
  const now = moment();

  const timeDifference = now.diff(inputDate, "seconds");

  if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)}분 전`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)}시간 전`;
  } else {
    return inputDate.format("YYYY-MM-DD");
  }
};
