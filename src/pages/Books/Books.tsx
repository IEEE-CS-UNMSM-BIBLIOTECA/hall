import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useLocalStorage } from '@mantine/hooks';
import Masonry from 'react-masonry-css';
import { useQuery } from '@tanstack/react-query';
import PageShell from '@/layout/PageShell';
import { getDocuments, getDocumentsPublic } from '@/services/api';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import BookCard from '@/components/BookCard';
import { breakpointCols } from '@/constants';
import './Books.css';

const WORDS = ['cuando', 'como', 'donde', 'lo que'];

const Content = ({ token }: { token: string | null }) => {
  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: token ? getDocuments : getDocumentsPublic,
  });

  if (booksQuery.isLoading) {
    return <Loading />;
  }

  if (booksQuery.isError || !booksQuery.data) {
    return <Error />;
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {booksQuery.data.map((book, index) => (
        <BookCard
          key={index}
          data={book}
        />
      ))}
    </Masonry>
  );
};

const LeftSection = ({ wordIndex }: { wordIndex: number }) => {
  const [, setLocation] = useLocation();

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <Stack flex={1} gap="xl" maw={400}>
        <Title>Lee {WORDS[wordIndex]} quieras.</Title>
        <Text>Descubre libros, recógelos cuando quieras. Sin costo.</Text>
        <Flex gap="sm" direction={{ base: 'column', xl: 'row' }}>
          <Button variant="primary" size="md" fullWidth onClick={() => setLocation('/signup')}>
            EMPIEZA HOY
          </Button>
          <Button size="md" fullWidth onClick={() => setLocation('/signin')}>
            INICIAR SESIÓN
          </Button>
        </Flex>
      </Stack>
    </div>
  );
};

const Books = () => {
  const [wordIndex, setWord] = useState(0);
  const [token] = useLocalStorage({ key: 'token' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWord((cur_word) => (cur_word + 1) % WORDS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <PageShell>
        <div className="group gap-xxl ai-center jc-space-between">
          {
            !token &&
            <Box visibleFrom="md">
              <LeftSection wordIndex={wordIndex} />
            </Box>
          }
          <div className="scrollable-page flex-1">
          <div className="page-header">
            {token && 'LIBROS'}
          </div>
            <Content token={token} />
          </div>
        </div>
      </PageShell>
    </>
  );
};

export default Books;
