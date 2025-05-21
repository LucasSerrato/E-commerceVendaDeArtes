
export async function urlToFile(url, filename, mimeType = "image/jpeg") {
  const res = await fetch(url);
  const buf = await res.blob();
  return new File([buf], filename, { type: mimeType });
}
