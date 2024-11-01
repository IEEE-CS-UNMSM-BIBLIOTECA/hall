import { Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import PageShell from '@/layout/PageShell';
import { getBook } from '@/services/api';

const Book = ({
  id,
}: {
  id: string
}) => {
  const bookQuery = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
  });

  if (bookQuery.isPending) {
    return <p>Cargando libro...</p>;
  }

  return (
    <PageShell>
      <div className="flex-center">
        <img
          src={bookQuery.data.image}
          alt={`Portada de ${bookQuery.data.title}`}
          style={{
            height: '100%',
          }}
        />
      </div>
    </PageShell>
  );
};

export default Book;
