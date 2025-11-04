import { scrapeAllProducts } from "./scrape_all_products";

(async () => {
  const response = await scrapeAllProducts();
  console.log(
    `Product count: ${response.products.length} | Possibly lost unaccesible products: ${response.possiblyLostProducts}`,
  );
})();
