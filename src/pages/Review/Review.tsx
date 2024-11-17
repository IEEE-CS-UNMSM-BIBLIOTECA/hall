import { Rating, Title } from '@mantine/core';
import LoremIpsum from 'react-lorem-ipsum';
import { IconArrowLeft } from '@tabler/icons-react';
import { useLocation } from 'wouter';
import PageShell from '@/layout/PageShell';
import { ReviewType } from '@/types';
import UserBadge from '@/components/UserBadge';
import LikeButton from '@/components/LikeButton';
import Links from '@/components/Links';

const data: ReviewType = {
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
};

const Review = ({ id }: { id: string }) => {
  const reviewQuery = { data };
  const [, setLocation] = useLocation();

  return (
    <PageShell>
      <div className="page-container gap-xl">
        <img
          src={reviewQuery.data.document.cover_url}
          alt={`Portada de ${reviewQuery.data.document.title}`}
        />
        <div className="stack gap-lg">
          <section className="group gap-xs ai-center">
            <IconArrowLeft
              className="icon-button"
              onClick={() => setLocation(`/book/${reviewQuery.data.document.id}`)}
            />
            <div className="stack">
              <a href={`/book/${reviewQuery.data.document.id}`}>
                {reviewQuery.data.document.title}
              </a>
              <Links
                links={reviewQuery.data.document.authors.map((author) => ({
                  href: `/author/${author.id}`,
                  label: author.name,
                }))}
                className="fz-sm c-dimmed"
              />
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
                name={reviewQuery.data.user.username}
                id={reviewQuery.data.user.id}
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
