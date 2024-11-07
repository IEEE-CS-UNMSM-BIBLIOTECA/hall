import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Box, Center, Flex, Stack } from '@mantine/core';
import PageShell from '@/layout/PageShell';
import { Book } from '@/interfaces';
import BookCard from '@/components/BookCard';
import './List.css';

const List = ({ id }: { id: string }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumnsObj = {
    default: 5, // Número de columnas por defecto
    1200: 4, // Para pantallas más pequeñas (max-width: 1200px)
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
    <PageShell>
      <Flex
        gap={{ base: 'xl', md: 'var(--mantine-spacing-xxxl)' }}
        direction={{ base: 'column' }}
        align={{ base: 'stretch' }}
        justify="space-between"
        style={{ height: '100vh' }}
      >
        <div
          style={{
            height: '100vh',
            flex: 2,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          <Stack gap={0}>
            <Center h={100}>
              id: {id}
            </Center>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {books.map((book, index) => (
                <BookCard key={index} image={book.image} title={book.title} author={book.author} />
              ))}
            </Masonry>
          </Stack>
        </div>
      </Flex>
    </PageShell>
  );
};

export default List;
