const getData = async (url: string) => {
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

export default getData;
