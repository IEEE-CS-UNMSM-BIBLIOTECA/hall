import { Button, Rating, Spoiler, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import PageShell from '@/layout/PageShell';
import { getDocument } from '@/services/api';
import EmbeddedReview from '@/components/EmbeddedReview';
import Links from '@/components/Links';
import { ReviewTypePreview } from '@/types';
import AddToList from './components/AddToList';

const mockReviews: ReviewTypePreview[] = [
  {
    id: 1,
    title: 'Excelente',
    content: 'Me encantó este libro, lo recomiendo mucho.',
    rating: 5,
    total_likes: 10,
    liked: true,
    spoiler: false,
    user: {
      id: 1,
      username: 'John Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
  {
    id: 2,
    title: 'Muy bueno',
    content: 'Muy buen libro, lo recomiendo.',
    rating: 4,
    total_likes: 5,
    liked: false,
    spoiler: false,
    user: {
      id: 2,
      username: 'Jane Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
];

const Book = ({
  id,
}: {
  id: string
}) => {
  const [addListOpened, addListHandlers] = useDisclosure(false);

  const qDocument = useQuery({
    queryKey: ['book', id],
    queryFn: () => getDocument(id),
  });

  if (qDocument.isPending) {
    return (
      <PageShell />
    );
  }

  if (qDocument.isError) {
    return (
      <PageShell>
        <div>
          Error
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <PageShell>
        <div className="page-container gap-xl">
          <img
            src={qDocument.data.cover_url}
            alt={`Portada de ${qDocument.data.title}`}
          />
          <div className="vertical-scroll">
            <div className="stack gap-xxl">
              <main className="stack gap-xl">
                {
                  qDocument.data.mean_rating &&
                  <section>
                    <Rating
                      value={qDocument.data.mean_rating}
                      readOnly
                    />
                  </section>
                }
                <section className="stack gap-sm">
                  <Title>
                    {qDocument.data.title}
                  </Title>
                  <div className="fz-sm">
                    <Links
                      links={qDocument.data.authors.map((author) => ({
                        href: `/author/${author.id}`,
                        label: author.name,
                      }))}
                    />
                    {' · '}
                    <a href={`/year/${qDocument.data.publication_year}`}>
                      {qDocument.data.publication_year}
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
                  {qDocument.data.description}
                </Spoiler>
                <section className="stack gap-xs">
                  TAGS
                  <Links
                    links={qDocument.data.tags.map((tag) => ({
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
                  <Button>
                    NUEVA RESEÑA
                  </Button>
                </header>
                <section className="stack gap-xl">
                {
                  mockReviews.map((review) => (
                    <div key={review.id}>
                      <EmbeddedReview
                        data={review}
                      />
                    </div>
                  ))
                }
                </section>
              </section>
            </div>
          </div>
        </div>
      </PageShell>
      <AddToList
        document_id={qDocument.data.id}
        opened={addListOpened}
        onClose={addListHandlers.close}
      />
    </>
  );
};

export default Book;
