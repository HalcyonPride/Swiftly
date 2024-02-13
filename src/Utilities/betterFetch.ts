export async function betterFetch(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  if (!!response.ok) {
    return await response.json();
  } else {
    console.log(await response.text());
    throw new Error();
  }
}

export default betterFetch;
