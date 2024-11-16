import { TextInput } from '@mantine/core';
import Masonry from 'react-masonry-css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import PageShell from '@/layout/PageShell';
import BookCard from '@/components/BookCard';
import { searchDocument } from '@/services/api';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const breakpointColumnsObj = {
  default: 5,
  1536: 4,
  1280: 3,
  768: 2,
  480: 1,
};

const Results = ({ queryFilter }: { queryFilter: string }) => {
  if (!queryFilter) {
    return (
      <p className="c-dimmed">
        Los resultados aparecerán aquí
      </p>
    );
  }

  const searchQuery = useQuery({
    queryKey: ['search'],
    queryFn: () => searchDocument(queryFilter),
  });

  if (searchQuery.isLoading) {
    return <Loading />;
  }

  if (searchQuery.isError || !searchQuery.data) {
    return <Error />;
  }

  if (searchQuery.data.length === 0) {
    return (
      <p className="c-dimmed">
        No se encontraron resultados
      </p>
    );
  }

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ paddingTop: 'var(--mantine-spacing-lg)' }}
      >
        {searchQuery.data.map((book) => (
          <BookCard
            key={book.id}
            data={book}
          />
        ))}
      </Masonry>
    </div>
  );
};

const Search = () => {
  const [queryFilter, setQueryFilter] = useState('');
  const [debouncedQueryFilter] = useDebouncedValue(queryFilter, 200);

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
          className="hide-scrollbar stack gap-xl"
        >
          <div className="page-header">
            BÚSQUEDA
          </div>
          <div className="stack gap-xxs">
            <TextInput
              value={queryFilter}
              onChange={(event) => setQueryFilter(event.currentTarget.value)}
              placeholder="Busca un libro..."
              variant="transparent"
              styles={{
                input: {
                  fontSize: 'var(--mantine-h1-font-size)',
                  fontWeight: 'var(--mantine-h1-font-weight)',
                  height: 'auto',
                  padding: 0,
                },
              }}
            />
            <Results queryFilter={debouncedQueryFilter} />
          </div>
        </div>
      </PageShell>
    </>
  );
};

export default Search;
