import PageShell from '@/layout/PageShell';

const Book = ({ id }: { id: string }) => {
  return (
    <PageShell>
      <div className="book-entry-container">book/{id}</div>
    </PageShell>
  );
};

export default Book;
