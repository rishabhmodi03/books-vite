import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const BookCard = ({ book, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
      <motion.div
        ref={cardRef}
        className="relative bg-gray-800 dark:bg-gray-900 rounded-lg p-6 glow-border hover:scale-105 transition-transform duration-300 cursor-pointer"
        role="article"
        aria-labelledby={`book-title-${index}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        whileHover={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.7)' }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isFlipped ? (
            <div>
              <h2
                id={`book-title-${index}`}
                className="text-xl font-semibold text-cyan-300 dark:text-cyan-200 mb-2 truncate"
                title={book.title}
              >
                {book.title || 'Untitled'}
              </h2>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                {book.author || 'Unknown Author'}
              </p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block lightning-button bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold glow-border"
                aria-label={`Read ${book.title || 'Untitled'}`}
                onClick={(e) => e.stopPropagation()}
              >
                Read Book
              </a>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-700 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-center items-center transform rotate-y-180">
              <p className="text-cyan-300 dark:text-cyan-200 text-center">
                {book.title || 'Untitled'} by {book.author || 'Unknown Author'}
              </p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block lightning-button bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold glow-border"
                aria-label={`Read ${book.title || 'Untitled'}`}
                onClick={(e) => e.stopPropagation()}
              >
                View PDF
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Tilt>
  );
};

export default BookCard;