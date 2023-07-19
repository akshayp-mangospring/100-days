const padZeros = (t) => t.toString().padStart(2, '0');

export const convertToMinutesText = (timeInSec) => {
  if (timeInSec < 60) return `00:${padZeros(timeInSec)}`;

  const minutes = parseInt(timeInSec / 60, 10);
  const seconds = timeInSec % 60;

  return `${padZeros(minutes)}:${(padZeros(seconds))}`;
};
