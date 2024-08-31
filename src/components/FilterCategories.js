import React from 'react';

const FilterCategories = ({ categories, selectedCategories, setSelectedCategories }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Filter Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategories(prev => 
              prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
            )}
            className={`p-2 rounded ${selectedCategories.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterCategories;