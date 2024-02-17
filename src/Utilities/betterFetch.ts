export async function betterFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!!response.ok) {
    return await response.json();
  } else {
    console.log(await response.text());
    throw Error(`${response.status} Error: ${response.statusText}`);
  }
}

export default betterFetch;
