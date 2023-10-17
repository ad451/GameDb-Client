export const durationUtil = (date: Date): string => {
  let createdAt = (Date.now()-Date.parse(date.toString())) / 1000;
  console.log(createdAt);
  if (createdAt < 60) {
    return `${Math.floor(createdAt)} seconds`;
  } else {
    createdAt = createdAt / 60;
    if (createdAt < 60) {
      return `${Math.floor(createdAt)} minute${createdAt >= 2 ? 's ' : ' '}`;
    } else {
      createdAt = createdAt / 60;
      if (createdAt < 24) {
        return `${Math.floor(createdAt)} hour${createdAt >= 2 ? 's ' : ' '}`;
      } else {
        createdAt = createdAt / 24;
        if (createdAt < 30) {
          return `${Math.floor(createdAt)} day${createdAt >= 2 ? 's ' : ' '}`;
        } else {
          createdAt = createdAt / 30;
          if (createdAt < 12) {
            return `${Math.floor(createdAt)} month${
              createdAt >= 2 ? 's ' : ' '
            }`;
          } else {
            createdAt = createdAt / 12;
            if (createdAt) {
              return `${Math.floor(createdAt)} year${
                createdAt >= 2 ? 's ' : ' '
              }`;
            }
          }
        }
      }
    }
  }
  return 'A long, long time ago';
};
