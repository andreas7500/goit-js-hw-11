import axios from 'axios';

// export default async function fetchImages(query, page) {
//   const url = 'https://pixabay.com/api/';
//   const KEY = '34759056-2de4c592571744c5e49452dcb';
//   const filter = `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   return await axios.get(`${url}${filter}`).then(response => response.data);
// }

export default async function fetchImages(query, page) {
  const url = 'https://pixabay.com/api/';
  const KEY = '34759056-2de4c592571744c5e49452dcb';
  const filter = `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios.get(`${url}${filter}`).then(response => response.data);
  // .catch(console.warn);
}
