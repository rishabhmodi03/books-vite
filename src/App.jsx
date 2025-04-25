import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import BookCard from './components/BookCard';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import { particleOptions } from './constants/particles';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    fetch('/books.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch books');
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setFilteredBooks(
      books.filter(
        (book) =>
          (book.title || '').toLowerCase().includes(value.toLowerCase()) ||
          (book.author || '').toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFilter = (filter) => {
    if (filter === 'all') {
      setFilteredBooks(books);
    } else if (filter === 'author') {
      setFilteredBooks([...books].sort((a, b) => (a.author || '').localeCompare(b.author || '')));
    } else if (filter === 'title') {
      setFilteredBooks([...books].sort((a, b) => (a.title || '').localeCompare(b.title || '')));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 dark:bg-gray-100">
        <motion.div
          className="w-16 h-16 border-4 border-t-cyan-400 border-r-cyan-400 border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 dark:bg-gray-100">
        <p className="text-xl font-semibold text-red-400 dark:text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} text-white dark:text-gray-800 relative transition-colors duration-500`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute inset-0 z-0"
      />
      <motion.header
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 glitch">
          Techy Books Library
        </h1>
        <p className="text-lg text-cyan-300 dark:text-gray-600 mt-2">Dive into a futuristic reading experience</p>
      </motion.header>

      <div className="container mx-auto px-4 relative z-10">
        <motion.button
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-700 dark:bg-gray-200 glow-border"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.div>
        </motion.button>

        <SearchBar onSearch={handleSearch} />
        <FilterPanel onFilter={handleFilter} />

        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book, index) => (
              <BookCard key={index} book={book} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;