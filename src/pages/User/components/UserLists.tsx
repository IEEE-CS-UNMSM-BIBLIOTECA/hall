import { useQuery } from '@tanstack/react-query';
import Error from '@/components/Error';
import ListPreview from '@/components/ListPreview';
import Loading from '@/components/Loading';
import { getUserLists } from '@/services/api';
import Empty from '@/components/Empty';

const UserLists = ({ userId }: {
  userId: string
}) => {
  const listsQuery = useQuery({
    queryKey: ['user', userId, 'lists'],
    queryFn: () => getUserLists(parseInt(userId, 10)),
  });

  if (listsQuery.isLoading || listsQuery.isFetching) { return <Loading />; }
  if (listsQuery.isError || !listsQuery.data) { return <Error />; }
  console.log('listsQuery.data', listsQuery.data);
  if (!listsQuery.data.length) { return <Empty />; }

  return (
    <div className="stack gap-xl">
    {
      listsQuery.data.map((listData) => (
        <ListPreview data={listData} />
      ))
    }
    </div>
  );
};

export default UserLists;
