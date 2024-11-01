import PageShell from '@/layout/PageShell';

const User = ({ id, tab }: { id: string; tab: string }) => {
  return (
    <PageShell>
      user/{id} ({tab})
    </PageShell>
  );
};

export default User;
