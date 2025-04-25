import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    onSearch(value);
  }, [value, onSearch]);

  return (
    <motion.div
      className="relative max-w-md mx-auto"
      initial={{ width: '2.5rem' }}
      animate={{ width: isFocused ? '100%' : '2.5rem' }}
      transition={{ duration: 0.4 }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search books..."
        className="w-full p-4 bg-gray-800 dark:bg-gray-900 text-cyan-300 dark:text-cyan-200 rounded-lg glow-border focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Search books"
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: value ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="absolute left-4 top-4 text-cyan-300/50 dark:text-cyan-200/50">
          {value.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;