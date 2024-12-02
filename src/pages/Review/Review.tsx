import { Rating, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useLocation } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PageShell from '@/layout/PageShell';
import UserBadge from '@/components/UserBadge';
import LikeButton from '@/components/LikeButton';
import Links from '@/components/Links';
import { addLikeToReview, getReview, removeLikeFromReview } from '@/services/api';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const ReviewPage = ({ id }: { id: string }) => {
  const reviewQuery = useQuery({
    queryKey: ['review', id],
    queryFn: () => getReview(Number(id)),
  });
  const [, setLocation] = useLocation();

  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: () => addLikeToReview(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', id] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => removeLikeFromReview(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review', id] });
    },
  });

  if (reviewQuery.isLoading || reviewQuery.isFetching) { return <Loading />; }
  if (reviewQuery.isError || !reviewQuery.data) { return <Error />; }

  console.log('reviewQuery.data', reviewQuery.data);

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
              {reviewQuery.data.content}
            </section>
            <footer className="group jc-space-between ai-center">
              <UserBadge
                name={reviewQuery.data.user.username}
                id={reviewQuery.data.user.id}
              />
              <LikeButton
                totalLikes={reviewQuery.data.total_likes}
                liked={reviewQuery.data.liked}
                addLike={() => addLikeMutation.mutate()}
                removeLike={() => removeLikeMutation.mutate()}
              />
            </footer>
          </main>
        </div>
      </div>
    </PageShell>
  );
};

export default ReviewPage;
