import axios from 'axios';

export async function fetchPopularRepos (language) {
  var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  const {data} =  await axios.get(encodedURI);
  return data.items;
}