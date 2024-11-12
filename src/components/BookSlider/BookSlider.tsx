import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import BookCard from '@/components/BookCard/BookCard';

interface Book {
  image: string;
  title: string;
  author: string;
}

const BookSlider = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumnsObj = {
    default: 4, // Número de columnas por defecto
    1200: 3, // Para pantallas más pequeñas (max-width: 1200px)
    900: 2, // Para pantallas más pequeñas (max-width: 900px)
    600: 1, // Para pantallas más pequeñas (max-width: 600px)
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3000/books?');
    if (!response.ok) {
      throw new Error('Error fetching books');
    }
    const data = await response.json();
    setBooks(data);
    setLoading(false);
  };

  if (loading) {
    return <p>Cargando libros...</p>;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {books.map((book, index) => (
        <BookCard
          key={index}
          image={book.image}
          title={book.title}
          authors={[
            { href: 'https://autor1.com', label: 'Autor 1' },
            { href: 'https://autor2.com', label: 'Autor 2' },
          ]}
        />
      ))}
    </Masonry>
  );
};

export default BookSlider;
