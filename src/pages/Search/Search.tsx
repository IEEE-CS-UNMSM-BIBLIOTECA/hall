import { TextInput } from '@mantine/core';
import Masonry from 'react-masonry-css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
  const searchQuery = useQuery({
    queryKey: ['search'],
    queryFn: () => {
      if (queryFilter === '') {
        return Promise.resolve([]);
      }
      return searchDocument(queryFilter);
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['search'] });
  }, [queryFilter]);

  if (queryFilter === '') {
    return (
      <p className="c-dimmed">
        Los resultados aparecerán aquí
      </p>
    );
  }

  if (searchQuery.isPending || searchQuery.isFetching) {
    return (
      <div style={{ marginTop: 'var(--mantine-spacing-lg)' }}>
        <Loading />
      </div>
    );
  }

  if ((searchQuery.isError) || !searchQuery.data) {
    return (
      <div style={{ marginTop: 'var(--mantine-spacing-lg)' }}>
        <Error />
      </div>
    );
  }

  if (searchQuery.data.length === 0) {
    return (
      <p className="c-dimmed">
        No se encontraron resultados
      </p>
    );
  }

  console.log(searchQuery.data);

  return (
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
  );
};

const Search = () => {
  const [queryFilter, setQueryFilter] = useState('');
  const [debouncedQueryFilter] = useDebouncedValue(queryFilter, 200);

  return (
    <>
      <PageShell>
        <div className="scrollable-page">
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
