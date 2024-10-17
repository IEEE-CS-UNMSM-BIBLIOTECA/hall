import Masonry from 'react-masonry-css';
import BookCard from '@/components/BookCard/BookCard';
import booksData from '@/data/booksData';

const BookSlider = () => {
  const breakpointColumnsObj = {
    default: 4, // Número de columnas por defecto
    1200: 3, // Para pantallas más pequeñas (max-width: 1200px)
    900: 2, // Para pantallas más pequeñas (max-width: 900px)
    600: 1, // Para pantallas más pequeñas (max-width: 600px)
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {booksData.map((book, index) => (
        <BookCard
          key={index}
          image={book.image}
          title={book.title}
          author={book.author}
        />
      ))}
    </Masonry>
  );
};

export default BookSlider;
