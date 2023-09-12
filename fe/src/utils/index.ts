import { DAY, HOUR, MINUTE, MONTH, SECOND, YEAR } from "./constants";

export const isSameItems = (a: number[], b: number[]) => {
  const setA = new Set(a);
  const setB = new Set(b);

  return setA.size === setB.size && [...setA].every((value) => setB.has(value));
};

export const getFormattedPrice = (inputValue: string) => {
  const onlyNumber = inputValue.replace(/[^\d]+/g, "");
  const limitedPrice = onlyNumber.slice(0, 9);

  if (limitedPrice) {
    const krw = parseInt(limitedPrice).toLocaleString("ko-KR");

    return krw;
  } else {
    return ""; // Notice: inputValue의 length가 0일 경우 NaN 방지
  }
};

export const getTimeLine = (timestamp: string) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const timeDifference = now.getTime() - pastDate.getTime();

  switch (true) {
    case timeDifference < MINUTE:
      return `${Math.floor(timeDifference / SECOND)}초 전`; // Memo: 방금 전???
    case timeDifference < HOUR:
      return `${Math.floor(timeDifference / MINUTE)}분 전`;
    case timeDifference < DAY:
      return `${Math.floor(timeDifference / HOUR)}시간 전`;
    case timeDifference < MONTH:
      return `${Math.floor(timeDifference / DAY)}일 전`;
    case timeDifference < YEAR:
      return `${Math.floor(timeDifference / MONTH)}개월 전`;
    case timeDifference > YEAR:
      return `${Math.floor(timeDifference / YEAR)}년 전`;
    default:
      return;
  }
};
