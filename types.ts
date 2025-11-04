export type Product = {
  price: any;
};

export type EcommerceProductsResponse = {
  total: number;
  count: number;
  products: Product[];
};

export type PriceRange = {
  min: number;
  max: number;
};

export type ScrapeAllProductsResponse = {
  products: Product[];
  possiblyLostProducts: Boolean;
};
