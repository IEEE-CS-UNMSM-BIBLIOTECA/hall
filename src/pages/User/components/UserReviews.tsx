import { useQuery } from '@tanstack/react-query';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { getUserReviews } from '@/services/api';
import EmbeddedReview from '@/components/EmbeddedReview';
import Empty from '@/components/Empty';
import Links from '@/components/Links';

const UserReviews = ({ userId }: {
  userId: string
}) => {
  const reviewsQuery = useQuery({
    queryKey: ['user', userId, 'reviews'],
    queryFn: () => getUserReviews(parseInt(userId, 10)),
  });

  if (reviewsQuery.isLoading || reviewsQuery.isFetching) { return <Loading />; }
  if (reviewsQuery.isError || !reviewsQuery.data) { return <Error />; }
  if (!reviewsQuery.data.length) { return <Empty />; }

  console.log('reviewsQuery.data', reviewsQuery.data);

  return (
    <div className="stack gap-xl">
    {
      reviewsQuery.data.map((reviewData) => (
        <div className="stack gap-sm">
          <div className="group gap-md">
            <img
              alt={`Portada de ${reviewData.book.title}`}
              src={reviewData.book.cover_url}
              style={{ flex: 1 }}
            />
            <EmbeddedReview data={reviewData} />
          </div>
          <div className="stack">
            <a className="fz-lg" href={`/book/${reviewData.book.id}`}>
              {reviewData.book.title}
            </a>
            <Links
              links={reviewData.book.authors.map(({ id, name }) => ({
                href: `/author/${id}`,
                label: name,
              }))}
              className="fz-sm c-dimmed"
            />
          </div>
        </div>
        // <EmbeddedReview data={reviewData} />
      ))
    }
    </div>
  );
};

export default UserReviews;
