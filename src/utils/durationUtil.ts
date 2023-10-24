export const durationUtil = (date: Date): string => {
  let createdAt = (Date.now() - Date.parse(date.toString())) / 1000;
  console.log(createdAt);
  const pluralSuffix = `${createdAt >= 2 ? 's. ' : '. '}`;
  let duration = '';
  if (createdAt < 60) {
    duration = `${Math.floor(createdAt)} sec`;
  } else {
    createdAt = createdAt / 60;
    if (createdAt < 60) {
      duration = `${Math.floor(createdAt)} min`;
    } else {
      createdAt = createdAt / 60;
      if (createdAt < 24) {
        duration = `${Math.floor(createdAt)} hr`;
      } else {
        createdAt = createdAt / 24;
        if (createdAt < 30) {
          duration = `${Math.floor(createdAt)} day`;
        } else {
          createdAt = createdAt / 30;
          if (createdAt < 12) {
            duration = `${Math.floor(createdAt)} mo`;
          } else {
            createdAt = createdAt / 12;
            if (createdAt) {
              duration = `${Math.floor(createdAt)} yr`;
            }
          }
        }
      }
    }
  }
  return duration+pluralSuffix;
};
