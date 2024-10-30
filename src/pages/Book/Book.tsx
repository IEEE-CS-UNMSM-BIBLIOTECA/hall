import PageShell from '@/layout/PageShell';

const Book = ({
  id,
}: {
  id: string
}) => {
  return (
    <PageShell>
      book/{id}
    </PageShell>
  );
};

export default Book;
