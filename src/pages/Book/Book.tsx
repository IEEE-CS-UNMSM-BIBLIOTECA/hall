import { Button, Rating, Spoiler, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import PageShell from '@/layout/PageShell';
import { getDocument, getReviewsByDocument } from '@/services/api';
import EmbeddedReview from '@/components/EmbeddedReview';
import Links from '@/components/Links';
import AddToList from './components/AddToList';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import CreateReview from './components/CreateReview';

const Reviews = ({ documentId }: { documentId: number }) => {
  const reviewsQuery = useQuery({
    queryKey: ['reviews_by_document', documentId],
    queryFn: () => getReviewsByDocument(documentId),
  });

  if (reviewsQuery.isPending) {
    return (
      <Loading />
    );
  }

  if (reviewsQuery.isError || !reviewsQuery.data) {
    return (
      <Error />
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

  const documentQuery = useQuery({
    queryKey: ['book', id],
    queryFn: () => getDocument(id),
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

  return (
    <>
      <PageShell>
        <div className="page-container gap-xl">
          <img
            src={documentData.cover_url}
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
                  <Button variant="primary">
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
                <Reviews documentId={documentData.id} />
              </section>
            </div>
          </div>
        </div>
      </PageShell>
      <AddToList
        document_id={documentData.id}
        opened={addListOpened}
        onClose={addListHandlers.close}
      />
      <CreateReview
        opened={createReviewOpened}
        onClose={createReviewHandlers.close}
      />
    </>
  );
};

export default Book;
