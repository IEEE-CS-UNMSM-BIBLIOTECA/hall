import { useQuery } from '@tanstack/react-query';
import ListPreview from '@/components/ListPreview';
import PageShell from '@/layout/PageShell';
import { getLists } from '@/services/api';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const Content = () => {
  const listsQuery = useQuery({
    queryKey: ['lists'],
    queryFn: getLists,
  });

  if (listsQuery.isLoading || listsQuery.isFetching) { return <Loading />; }
  if (listsQuery.isError || !listsQuery.data) { return <Error />; }
  if (!listsQuery.data.length) { return <Empty />; }

  return (
    <div
      className="stack gap-xl py-xxl"
      style={{
        maxWidth: 920,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
    {
      listsQuery.data.map((listData) => (
        <ListPreview data={listData} big />
      ))
    }
    </div>
  );
};

const Lists = () => {
  return (
    <PageShell>
      <div className="scrollable-page">
        <div className="page-header">
          LISTAS
        </div>
        <Content />
      </div>
    </PageShell>
  );
};

export default Lists;
