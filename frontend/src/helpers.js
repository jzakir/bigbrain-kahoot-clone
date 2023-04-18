export const defaultQuizThumbnail = 'https://kahoot.com/files/2020/03/Schools-library-GettingStarted-570x320.png';
export const defaultQuestionThumbnail = 'https://media.istockphoto.com/id/1455070729/photo/white-sticky-note-with-question-mark-and-red-push-pin-on-blue-cardboard.jpg?b=1&s=170667a&w=0&k=20&c=B7j0CpTjbD-t3lWoC61UPu-4Jq9ZqEdVEHMSvPlSVt0=';

export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

// Regex taken from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function extractYoutubeId (url) {
  if (!url) {
    return false;
  }
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export function embedLink (videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}
