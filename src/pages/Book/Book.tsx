import { Button, Rating, Spoiler, Title } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import PageShell from '@/layout/PageShell';
import { addOrder, getDocument, getReviewsByDocument } from '@/services/api';
import EmbeddedReview from '@/components/EmbeddedReview';
import Links from '@/components/Links';
import AddToList from './components/AddToList';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import CreateReview from './components/CreateReview';

const Reviews = ({ document_id }: { document_id: number }) => {
  const reviewsQuery = useQuery({
    queryKey: ['reviews', { document_id }],
    queryFn: () => getReviewsByDocument(document_id),
  });

  if (reviewsQuery.isPending) {
    return (
      <Loading />
    );
  }

  if (reviewsQuery.isError) {
    return (
      <Error />
    );
  }

  if (!reviewsQuery.data || reviewsQuery.data.length === 0) {
    return (
      <p className="stack jc-center ai-center c-dimmed fz-sm">
        Aún no hay reseñas para este libro
      </p>
    );
  }

  return (
    <section className="stack gap-xxl">
    {
      reviewsQuery.data.map((review) => (
        <div key={review.id}>
          <EmbeddedReview
            data={review}
          />
        </div>
      ))
    }
    </section>
  );
};

const Book = ({
  id,
}: {
  id: string
}) => {
  const [addListOpened, addListHandlers] = useDisclosure(false);
  const [createReviewOpened, createReviewHandlers] = useDisclosure(false);

  const queryClient = useQueryClient();

  const documentQuery = useQuery({
    queryKey: ['book', id],
    queryFn: () => getDocument(id),
  });

  const addOrderMutation = useMutation({
    mutationFn: (document_id: number) => addOrder(document_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', { user: 'self' }] });
    },
  });

  if (documentQuery.isPending) {
    return (
      <PageShell>
        <Loading />
      </PageShell>
    );
  }

  if (documentQuery.isError) {
    return (
      <PageShell>
        <Error />
      </PageShell>
    );
  }

  const documentData = documentQuery.data;

  const handleAddOrder = async () => {
    await addOrderMutation.mutateAsync(Number(id));
    console.log('Order added');
  };

  return (
    <>
      <PageShell>
        <div className="page-container gap-xl">
          <img
            src={`http://143.198.142.139:8080/cover/${documentData.id}`}
            alt={`Portada de ${documentData.title}`}
          />
          <div className="vertical-scroll">
            <div className="stack gap-xxl">
              <main className="stack gap-xl">
                {
                  documentData.mean_rating &&
                  <section>
                    <Rating
                      value={documentData.mean_rating}
                      readOnly
                    />
                  </section>
                }
                <section className="stack gap-sm">
                  <Title>
                    {documentData.title}
                  </Title>
                  <div className="fz-sm">
                    <Links
                      links={documentData.authors.map((author) => ({
                        href: `/author/${author.id}`,
                        label: author.name,
                      }))}
                    />
                    {' · '}
                    <a href={`/year/${documentData.publication_year}`}>
                      {documentData.publication_year}
                    </a>
                  </div>
                </section>
                <section className="group gap-xs">
                  <Button
                    variant="primary"
                    loading={addOrderMutation.isPending}
                    onClick={handleAddOrder}
                  >
                    SEPARAR COPIA
                  </Button>
                  <Button onClick={addListHandlers.open}>
                    AÑADIR A LISTA
                  </Button>
                </section>
                <Spoiler
                  hideLabel="Leer menos"
                  showLabel="Leer más"
                >
                  {documentData.description}
                </Spoiler>
                <section className="stack gap-xs">
                  TAGS
                  <Links
                    links={documentData.tags.map((tag) => ({
                      href: `/tag/${tag.id}`,
                      label: `#${tag.name}`,
                    }))}
                    className="c-dimmed fz-sm"
                  />
                </section>
              </main>
              <section className="stack gap-xl">
                <header className="group jc-space-between ai-center">
                  RESEÑAS
                  <Button onClick={createReviewHandlers.open}>
                    NUEVA RESEÑA
                  </Button>
                </header>
                <Reviews document_id={documentData.id} />
              </section>
            </div>
          </div>
        </div>
      </PageShell>
      {
        addListOpened &&
        <AddToList
          document_id={documentData.id}
          opened={addListOpened}
          onClose={addListHandlers.close}
        />
      }
      {
        createReviewOpened &&
        <CreateReview
          document_id={documentData.id}
          opened={createReviewOpened}
          onClose={createReviewHandlers.close}
        />
      }
    </>
  );
};

export default Book;
