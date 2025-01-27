import { useEffect, useState } from 'react';

import { ProductCards } from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';

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
  const [activeFilter, setActiveFilter] = useState({
    category: 'all',
    color: 'all',
    priceRange: { label: '0 to Infinity', min: 0, max: Infinity },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const { category, color, priceRange } = activeFilter;
  const minPrice = priceRange.min;
  const maxPrice = priceRange.max;

  const {
    data: { products, totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  //clear the filters
  const clearFilters = () => {
    setActiveFilter({
      category: '',
      color: 'all',
      priceRange: { label: '0 to Infinity', min: 0, max: Infinity },
    });
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

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
              Showing: {endProduct + 1 - startProduct} of {totalProducts}{' '}
              products
            </h3>
            <ProductCards products={products} />

            {/* pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
