import { Rating, Title } from '@mantine/core';
import LoremIpsum from 'react-lorem-ipsum';
import { IconArrowLeft } from '@tabler/icons-react';
import { useLocation } from 'wouter';
import PageShell from '@/layout/PageShell';
import { ReviewTypeFull } from '@/types';
import UserBadge from '@/components/UserBadge';
import LikeButton from '@/components/LikeButton';

const data: ReviewTypeFull = {
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
  book: {
    id: 0,
    title: 'Título 1',
    cover_url: 'https://via.placeholder.com/200x310',
    author: {
      id: 0,
      name: 'Autor 1',
    },
  },
};

const Review = ({ id }: { id: string }) => {
  const reviewQuery = { data };
  const [, setLocation] = useLocation();

  return (
    <PageShell>
      <div className="page-container gap-xl">
        <img
          src={reviewQuery.data.book.cover_url}
          alt={`Portada de ${reviewQuery.data.book.title}`}
        />
        <div className="stack gap-lg">
          <section className="group gap-xs ai-center">
            <IconArrowLeft
              className="icon-button"
              onClick={() => setLocation(`/book/${reviewQuery.data.book.id}`)}
            />
            <div className="stack">
              <a href={`/book/${reviewQuery.data.book.id}`}>
                {reviewQuery.data.book.title}
              </a>
              <a className="fz-sm" href={`/author/${reviewQuery.data.book.author.id}`}>
                {reviewQuery.data.book.author.name}
              </a>
            </div>
          </section>
          <main className="vertical-scroll stack gap-lg">
            <Rating
              readOnly
              value={reviewQuery.data.rating}
            />
            <Title order={3}>
              {reviewQuery.data.title}
            </Title>
            <section>
              {/* {reviewQuery.data.content} */}
              <LoremIpsum p={4} />
            </section>
            <footer className="group jc-space-between ai-center">
              <UserBadge
                name={reviewQuery.data.author.name}
                id={reviewQuery.data.author.id}
              />
              <LikeButton
                totalLikes={data.total_likes}
                liked={data.liked}
                addLike={() => {}}
                removeLike={() => {}}
              />
            </footer>
          </main>
        </div>
      </div>
    </PageShell>
  );
};

export default Review;
