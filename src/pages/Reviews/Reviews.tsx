import EmbeddedReview from '@/components/EmbeddedReview';
import PageShell from '@/layout/PageShell';
import { ReviewType } from '@/types';
import Links from '@/components/Links';

const mockReviews: ReviewType[] = [
  {
    id: 1,
    title: 'Excelente',
    content: 'Me encantó este libro, lo recomiendo mucho.',
    rating: 5,
    total_likes: 10,
    liked: true,
    user: {
      id: 1,
      username: 'John Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
    spoiler: false,
    document: {
      id: 0,
      title: 'Título 1',
      cover_url: 'https://via.placeholder.com/200x310',
      authors: [
        {
          id: 0,
          name: 'Autor 1',
        },
      ],
    },
    own: false,
  },
  {
    id: 2,
    title: 'Muy bueno',
    content: 'Me gustó mucho este libro, lo recomiendo.',
    rating: 4,
    total_likes: 10,
    liked: false,
    user: {
      id: 2,
      username: 'Jane Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
    spoiler: false,
    document: {
      id: 1,
      title: 'Título 2',
      cover_url: 'https://via.placeholder.com/200x310',
      authors: [
        {
          id: 1,
          name: 'Autor 2',
        },
      ],
    },
    own: false,
  },
  {
    id: 3,
    title: 'Bueno',
    content: 'Me gustó este libro, lo recomiendo.',
    rating: 3,
    total_likes: 10,
    liked: false,
    user: {
      id: 3,
      username: 'John Smith',
      profile_picture_url: 'https://placehold.co/50x50',
    },
    spoiler: false,
    document: {
      id: 2,
      title: 'Título 3',
      cover_url: 'https://via.placeholder.com/200x310',
      authors: [
        {
          id: 2,
          name: 'Autor 3',
        },
      ],
    },
    own: true,
  },
];

const Reviews = () => {
  const reviewsQuery = { data: mockReviews };

  return (
    <PageShell>
      <div className="scrollable-page">
        <div className="page-header">
          RESEÑAS
        </div>
        <div
          className="stack gap-xxl py-xxl"
          style={{ width: 800, marginLeft: 'auto', marginRight: 'auto' }}
        >
        {
          reviewsQuery.data.map((reviewData) => (
            <div className="stack gap-sm">
              <div className="group gap-md">
                <img
                  alt={`Portada de ${reviewData.document.title}`}
                  src={reviewData.document.cover_url}
                  style={{ flex: 1 }}
                />
                <EmbeddedReview data={reviewData} big />
              </div>
              <div className="stack">
                <a className="fz-lg" href={`/book/${reviewData.document.id}`}>
                  {reviewData.document.title}
                </a>
                <Links
                  links={reviewData.document.authors.map(({ id, name }) => ({
                    href: `/author/${id}`,
                    label: name,
                  }))}
                  className="fz-sm c-dimmed"
                />
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </PageShell>
  );
};

export default Reviews;
