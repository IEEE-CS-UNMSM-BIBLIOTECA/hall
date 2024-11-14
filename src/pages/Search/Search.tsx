import { useEffect, useState } from 'react';
import { Center, Input, Stack, TextInput, Title } from '@mantine/core';
import Masonry from 'react-masonry-css';
import PageShell from '@/layout/PageShell';
import BookCard from '@/components/BookCard';
import { Book } from '@/interfaces';

const Search = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumnsObj = {
    default: 5, // Número de columnas por defecto
    1536: 4, // Para pantallas más pequeñas (max-width: 1536px)
    1280: 3,
    768: 2,
    480: 1,
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
    <>
      <PageShell>
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
            <Center h={100}>Búsqueda</Center>

            <TextInput
              size="xl"
              placeholder="Compiladores..."
              styles={{
                input: {
                  border: 'none',
                  fontSize: 'clamp(2rem, 5vw, 150px)',
                  height: 'auto',
                  padding: '0',
                  marginBottom: 'var(--mantine-spacing-md)',
                },
              }}
            />

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
          </Stack>
        </div>
      </PageShell>
    </>
  );
};

export default Search;
