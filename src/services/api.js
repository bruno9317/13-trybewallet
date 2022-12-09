export async function getCoins() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(url);
  const data = await result.json();
  //   const champions = await data.data;
  return data;
}

export default getCoins;
