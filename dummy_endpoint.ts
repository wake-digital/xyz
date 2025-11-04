import express from "express";
import type { PriceRange, EcommerceProductsResponse, Product } from "./types";
import process from "node:process";

const app = express();
const PORT = 3000;
const productCount = 5001;

let products: Product[];
switch (process.env.TESTCASE) {
  case "more_than_1000_same_price":
    products = [
      { price: 100 },
      ...Array.from({ length: 2000 }).map((_, i) => ({ price: 2000 })),
      { price: 30000 },
    ];

    break;
  case "less_than_1000":
    products = Array.from({ length: 900 }).map((_, i, a) => ({
      price: Math.round(i * (100000 / (a.length - 1))),
    }));
    break;
  default:
    products = Array.from({ length: productCount }).map((_, i, a) => ({
      price: Math.round(i * (100000 / (a.length - 1))),
    }));
}
app.get("/products", (_req, res) => {
  const priceRange = {
    min: Number(_req.query.minPrice) || 0,
    max: Number(_req.query.maxPrice) || 100000,
  };

  const productsInPriceRange = products.filter(
    (p) => p.price >= priceRange.min && p.price <= priceRange.max,
  );

  const productsToReturn = productsInPriceRange.slice(0, 1000);

  res.json({
    total: productsInPriceRange.length,
    count: productsToReturn.length,
    products: productsToReturn,
  } as EcommerceProductsResponse);
});

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}/products
product count: ${products.length}
specified test case: ${process.env.TESTCASE}`
  );
});
