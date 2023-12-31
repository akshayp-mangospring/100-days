const padZeros = (t) => t.toString().padStart(2, '0');

export const convertToMinutesText = (timeInSec) => {
  if (timeInSec < 60) return `00:${padZeros(timeInSec)}`;

  const minutes = parseInt(timeInSec / 60, 10);
  const seconds = timeInSec % 60;

  return `${padZeros(minutes)}:${(padZeros(seconds))}`;
};

export const updateObjProp = (o, k, v) => ({ ...o, [k]: v });

export const convertToReadableDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem('current_user'));

export const getYoutubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
};

export const getYoutubeEmbedUrl = u => u.includes('watch?v=') ? `https://www.youtube.com/embed/${getYoutubeVideoId(u)}` : u;
