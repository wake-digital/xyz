import type {
  Product,
  EcommerceProductsResponse,
  ScrapeAllProductsResponse,
} from "./types";
import { getProducts } from "./get_products";

/*
Get all products strategy:

  1. Set the lookup price range to 0 - 100,000.
  2. Query products in the specified price range and save them to an output array.
  3. If there are just as many products in the specified price as the obtained amount, return the output array. Otherwise continue.
  4. Change the lookup price range's min amount to the largest price amount in the last queried set of products.
  5. If the last set of queried set of products sorted by price has the same price at the first and the last element, increment the price range by 0.01 and set non critical error state to true because some products are impossible to query. Otherwise pop all the products with the highest price from the return array.
  6. Return to step 2.

*/

export const scrapeAllProducts =
  async (): Promise<ScrapeAllProductsResponse> => {
    const output: ScrapeAllProductsResponse = {
      products: [],
      possiblyLostProducts: false,
    };

    let priceRange = {
      min: 0,
      max: 100000,
    };

    let query: EcommerceProductsResponse = await getProducts(priceRange);

    output.products.push(...query.products);

    if (query.total === query.count) {
      //leave early if all all products were already queried on the first attempt.
      return output;
    }

    while (query.total > query.count) {
      priceRange.min = query.products[query.products.length - 1].price;
      if (
        query.products[0].price ===
        query.products[query.products.length - 1].price
      ) {
        priceRange.min += 0.01;
        output.possiblyLostProducts = true;
      } else {
        //we need to begin the next query at the last obtained price to minimize the chance of missing products to unconventional prices - so we will query those products again - therefore we remove them. This doesn't concernt the previous part of the if statement as in that case, we skip over the last price.
        while (
          output.products[output.products.length - 1].price === priceRange.min
        ) {
          output.products.pop();
        }
      }
      query = await getProducts(priceRange);
      output.products.push(...query.products);
    }

    return output;
  };
