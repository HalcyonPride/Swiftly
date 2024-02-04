export async function betterFetch(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    throw new Error();
  } else {
    return await response.json();
  }
}

export default betterFetch;
