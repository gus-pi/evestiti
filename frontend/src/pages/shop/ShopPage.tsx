import { useEffect, useState } from 'react';

import productsData from '../../data/products.json';
import { ProductCards } from './ProductCards';
import ShopFiltering from './ShopFiltering';

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewelry', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
  priceRanges: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 to $100', min: 50, max: 100 },
    { label: '$100 to $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);

  const [activeFilter, setActiveFilter] = useState({
    category: 'all',
    color: 'all',
    priceRange: { label: '0 to Infinity', min: 0, max: Infinity },
  });

  const applyFilter = () => {
    let filteredProducts = productsData;

    //filter by category
    if (activeFilter.category && activeFilter.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === activeFilter.category
      );
    }

    //filter by color
    if (activeFilter.color && activeFilter.color !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === activeFilter.color
      );
    }

    //filter by price range
    if (activeFilter.priceRange && activeFilter.priceRange.label !== 'all') {
      const { min, max } = activeFilter.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [activeFilter]);

  //clear the filters
  const clearFilters = () => {
    setActiveFilter({
      category: '',
      color: 'all',
      priceRange: { label: '0 to Infinity', min: 0, max: Infinity },
    });
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Discover The Hottest Products In Clothing! Elevate Your style with Our
          Wide Selection of Trending Women's Fashion Products.
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            clearFilters={clearFilters}
          />
          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Available Products: {products.length}
            </h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
