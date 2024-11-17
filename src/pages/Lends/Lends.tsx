import { useQuery } from '@tanstack/react-query';
import Masonry from 'react-masonry-css';
import PageShell from '@/layout/PageShell';
import { getLends } from '@/services/api';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { breakpointCols } from '@/constants';
import BookCard from '@/components/BookCard';
import isDateLate from '@/utils/isDateLate';
import readableDate from '@/utils/readableDate';

const Lends = () => {
  const lendsQuery = useQuery({
    queryKey: ['lends'],
    queryFn: getLends,
  });

  if (lendsQuery.isLoading) {
    return (
      <Loading />
    );
  }

  if (lendsQuery.isError || !lendsQuery.data) {
    return (
      <Error />
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {lendsQuery.data.map((order) => {
        const maxReturnDate = new Date(order.max_return_date);
        return (
          <div className="stack gap-xxs">
            <BookCard
              data={order.document}
            />
            <p className="fz-sm">
              Plazo:{' '}
              <span className={`fw-semibold ${isDateLate(maxReturnDate) && 'c-error'}`}>
                {readableDate(maxReturnDate)}
              </span>
            </p>
          </div>
        );
      })}
    </Masonry>
  );
};

const Settings = () => {
  return (
    <PageShell>
      <div className="page-header">
        MIS PRÉSTAMOS
      </div>
      <Lends />
    </PageShell>
  );
};

export default Settings;
