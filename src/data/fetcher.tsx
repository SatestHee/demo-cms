import { PropertyRes } from "../data/interface";

export async function fetcher(url: string): Promise<PropertyRes> {
  const { properties } = await fetch(url)
    .then((r) => r.json())
    .catch((err) => {
      console.error(err);
    });
  return properties;
}
