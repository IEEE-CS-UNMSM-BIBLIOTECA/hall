import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Avatar, Center, Flex, Stack, Title, Text } from '@mantine/core';
import { IconHeart, IconBook, IconDots } from '@tabler/icons-react';
import PageShell from '@/layout/PageShell';
import { Book } from '@/interfaces';
import BookCard from '@/components/BookCard';
import './List.css';

const List = ({ id }: { id: string }) => {
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
            <Center h={100}>lista de libros con id: {id}</Center>
            <Flex align="center" justify="space-between">
              <Title order={2} fw={350} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
                Libros con portada azul
              </Title>
              <IconDots size={30} />
            </Flex>
            <div
              style={{
                display: 'flex',
                gap: 'var(--mantine-spacing-md)',
                alignItems: 'center',
                marginBottom: 'var(--mantine-spacing-md)',
              }}
            >
              <Flex align="center" justify="center" direction={{ base: 'column', sm: 'row' }} gap="xs">
                <Flex align="center" gap="xs">
                  <Avatar
                    src="https://imgmedia.libero.pe/652x358/libero/original/2022/10/03/633b65ed2883df3ae046fcdd.webp"
                    size="sm"
                  />
                  <Text>Jesús Andrés Luján Carrión</Text>
                </Flex>
                <Flex align="center" gap="xs" style={{ marginLeft: 'var(--mantine-spacing-lg)' }}>
                  <Flex align="center" gap="xs">
                    <IconHeart size={20} />
                    23
                  </Flex>
                  <Flex align="center" justify="center" gap="xs">
                    <IconBook size={20} />
                    50 libros
                  </Flex>
                </Flex>
              </Flex>
            </div>
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
