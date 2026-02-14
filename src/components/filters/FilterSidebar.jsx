export const FilterSidebar = ({ onFilterChange, filters }) => {
  const categories = ['All', 'Dresses', 'Hijabs', 'Abayas']
  const colors = ['Black', 'White', 'Beige', 'Navy', 'Grey']
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under 100 DT', min: 0, max: 100 },
    { label: '100 - 200 DT', min: 100, max: 200 },
    { label: '200 - 300 DT', min: 200, max: 300 },
    { label: 'Over 300 DT', min: 300, max: Infinity }
  ]

  return (
    <aside className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Category</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => onFilterChange({ ...filters, category: cat })}
                  className="w-4 h-4"
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceMin === range.min && filters.priceMax === range.max}
                  onChange={() => onFilterChange({ ...filters, priceMin: range.min, priceMax: range.max })}
                  className="w-4 h-4"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => {
                  const newColors = filters.colors?.includes(color)
                    ? filters.colors.filter(c => c !== color)
                    : [...(filters.colors || []), color]
                  onFilterChange({ ...filters, colors: newColors })
                }}
                className={`w-10 h-10 rounded-full border-2 transition ${
                  filters.colors?.includes(color) ? 'border-black scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => onFilterChange({ category: 'All', priceMin: 0, priceMax: Infinity, colors: [] })}
          className="w-full py-2 text-sm border border-gray-300 hover:bg-gray-50 transition"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  )
}
