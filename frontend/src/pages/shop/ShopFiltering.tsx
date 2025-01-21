import { Filter, Filters } from '../../types/types';

type ShopFilteringProps = {
  filters: Filters;
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
  clearFilters: () => void;
};

const ShopFiltering = ({
  filters,
  activeFilter,
  setActiveFilter,
  clearFilters,
}: ShopFilteringProps) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      {/* category filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={activeFilter.category === category}
              onChange={(e) =>
                setActiveFilter({ ...activeFilter, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* color filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              checked={activeFilter.color === color}
              onChange={(e) =>
                setActiveFilter({ ...activeFilter, color: e.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* price range filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min} to ${range.max}`}
              checked={activeFilter.priceRange.label === range.label}
              onChange={() =>
                setActiveFilter({ ...activeFilter, priceRange: range })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* clear all filters */}
      <button
        onClick={clearFilters}
        className="bg-primary py-1 px-4 text-white rounded"
      >
        Clear All
      </button>
    </div>
  );
};

export default ShopFiltering;
