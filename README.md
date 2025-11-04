### Reviewer TLDR:

If you don't care about execution and only find the "bussiness logic" relevant, the ./scrape_all_products.ts file contains basically all of it and the getProducts function is just basically a fetch wrapper.

### Dependencies:

Node.js and NPM

### Getting started:

```bash
npm install #install dependencies

```

### Development:

```bash
npm run dummy_endpoint # runs a local instance immitating a reasonable immitation of the expected API
TESTCASE=more_than_1000_same_price npm run dummy_endpoint # test endpoint with the worst possible case
TESTCASE=less_than_1000 npm run dummy_endpoint # test endpoint with the simplest and quickest case

TEST=true npm run scraper # runs the program using the local endpoint
```

### Usage:

import the method from ./scrape_all_products.ts or run index.ts with this command:

```bash
npm run scraper # runs the scraper
```

### Remarks:

1. To briefly describe what I've done, there are the self explanatory ./dummy_endpoint.ts and ./types.ts files, then there's the ./get_products.ts file which abstracts a single call to the api with the getProducts function, ./scrape_all_products.ts where all the the logic is getting applied in tandem with getProducts in the scrapeAllProducts function to scrape all products and ./index.ts where the scrapeAllProducts function is just being called with the result being printed to the console.
2. My assumptions about the API and data: The obtained products are basically {price: Number} objects because we don't know about anything else. This puts us into an unfortunate predicament, because when there are more than 1000 products of the same price, the last x - 1000 are impossible to access. I will not ignore this problem and will instead add a non critical error to the response which will serve to notify the caller of the scrapeAllProducts function of the fact that some products were impossible to query. If there are 1001+ products of the same price, it will force me to increment the minPrice by a set amount because I don't know the price of the next element - I will choose to increment by 0.01 (one cent) - this however will also lead to the potential loss of products which have a price specified to a thousandth. However, I am willing to make this assumption, as this issue only occurs when there is a very unconvential price following the fact that some products are already impossible to query and an attempt to solve this by incrementing by a milionth for example would still lead to the potential loss of products which have the price specified to the tenth milionth. I might be needlessly overthinking it but I think it's good to specify even the edgiest of cases.
3. The scrapeAllProducts function in ./scrape_all_products.ts relies on the assumption that products all cost 0 - $100,000 (including the assumption they all have a price to beggin with).
4. Because of the nature of the project (being just a little showcase), I've choosen to run all typescript via tsx instead of building it.
5. I regret choosing to treat this as a project instead of just a single file, as I dislike the project structure. I just wanted to ensure everything works well on your end.

#### Hope you like it :)
