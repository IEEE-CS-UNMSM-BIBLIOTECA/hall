import { useQuery } from '@tanstack/react-query';
import { Button, Rating, Spoiler, Title } from '@mantine/core';
import LoremIpsum from 'react-lorem-ipsum';
import PageShell from '@/layout/PageShell';
import { getBook } from '@/services/api';
import { EmbeddedReviewType } from '@/types';
import EmbeddedReview from '@/components/EmbeddedReview';

const mockTags = [
  { id: '1', name: 'Graphic design' },
  { id: '2', name: 'Web design' },
  { id: '3', name: 'Illustration' },
  { id: '4', name: 'Typography' },
  { id: '5', name: 'Photography' },
  { id: '6', name: 'Branding' },
  { id: '7', name: 'Self-learning' },
];

const mockReviews: EmbeddedReviewType[] = [
  {
    id: 1,
    title: 'Excelente',
    content: 'Me encantó este libro, lo recomiendo mucho.',
    rating: 5,
    total_likes: 10,
    liked: true,
    author: {
      id: 1,
      name: 'John Doe',
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
    author: {
      id: 2,
      name: 'Jane Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
];

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
    return (
      <PageShell />
    );
  }

  return (
    <PageShell>
      <div className="flex-center-page gap-xl">
        <img
          src={bookQuery.data.image}
          alt={`Portada de ${bookQuery.data.title}`}
        />
        <div className="vertical-scroll">
          <div className="stack gap-xxl py-xxl">
            <main className="stack gap-xl">
              <section>
                <Rating
                  readOnly
                />
              </section>
              <section className="stack gap-sm">
                <Title>
                  {bookQuery.data.title}
                </Title>
                <div className="fz-sm">
                  <a href="/author/test">
                    Autor
                  </a>
                  {' · '}
                  <a href="/year/test">
                    2024
                  </a>
                </div>
              </section>
              <section className="group gap-xs">
                <Button variant="primary">
                  Separar copia
                </Button>
                <Button>
                  Añadir a lista
                </Button>
              </section>
              <section>
                <Spoiler
                  hideLabel="Leer menos"
                  showLabel="Leer más"
                  maxHeight={115}
                >
                  { /* {bookQuery.data.description} */ }
                  <LoremIpsum p={1} />
                </Spoiler>
              </section>
              <section className="stack gap-xs">
                TAGS
                <div className="c-dimmed fz-sm">
                  {
                    mockTags.map((tag, i) => (
                      <span>
                        <a
                          href={`/tag/${tag.id}`}
                          key={tag.id}
                        >
                          #{tag.name}
                        </a>
                        {i !== (mockTags.length - 1) && ', '}
                      </span>
                    ))
                  }
                </div>
              </section>
            </main>
            <section className="stack gap-lg">
              <header className="group space-between align-center">
                RESEÑAS
                <Button>
                  Añadir reseña
                </Button>
              </header>
              <section className="stack gap-xl">
              {
                mockReviews.map((review) => (
                  <EmbeddedReview
                    data={review}
                  />
                ))
              }
              </section>
            </section>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default Book;
