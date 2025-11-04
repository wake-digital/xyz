import type { PriceRange, Product, EcommerceProductsResponse } from "./types";
import process from "node:process";

//determine URL to use (local mock api for testing)
const endpoint =
  process.env.TEST === "true"
    ? "http://localhost:3000/products"
    : "https://api.ecommerce.com/products";

//construct url with query parameters
const endpointCompose = (priceRange?: PriceRange) =>
  endpoint +
  (priceRange
    ? `?minPrice=${priceRange?.min}&maxPrice=${priceRange?.max}`
    : "");

export async function getProducts(
  priceRange?: PriceRange,
): Promise<EcommerceProductsResponse> {
  const requestEndpoint: string = endpointCompose(priceRange);
  const requestParams: RequestInit = { method: "GET" };

  let response: Response, data: EcommerceProductsResponse;
  try {
    response = await fetch(requestEndpoint, requestParams);
    data = await response.json();
  } catch (e) {
    console.error(
      `Failed during a request when fetching and parsing data from endpoint "${requestEndpoint}" with parameters ${JSON.stringify(requestParams, undefined, 2)}`,
    );
    throw new Error(e);
  }
  data.products.sort((a, b) => a.price - b.price); // sort queried products ascending by price for more convenient manipulation
  return data;
}
