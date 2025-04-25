import { useState } from 'react';
import { motion } from 'framer-motion';

const FilterPanel = ({ onFilter }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'author', label: 'Author' },
    { id: 'title', label: 'Title' },
  ];

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {filters.map((filter, index) => (
        <motion.button
          key={filter.id}
          className={`px-4 py-2 rounded-full font-semibold text-white ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 glow-border'
              : 'bg-gray-700 dark:bg-gray-800'
          }`}
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleFilter(filter.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterPanel;