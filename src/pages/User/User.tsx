import { Button, Title } from '@mantine/core';
// import LoremIpsum from 'react-lorem-ipsum';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import PageShell from '@/layout/PageShell';
import UserLists from './components/UserLists';
import { getUser } from '@/services/api';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import UserReviews from './components/UserReviews';

const LinkButton = ({ children, onClick, active }: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <Button
      c="black"
      variant="transparent"
      onClick={onClick}
      styles={{ label: { textDecoration: active ? 'underline' : 'none' } }}
    >
      {children}
    </Button>
  );
};

const User = ({ id, initialTab }: { id: string; initialTab: string }) => {
  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [, setLocation] = useLocation();

  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(parseInt(id, 10)),
  });

  if (userQuery.isLoading || userQuery.isFetching) { return <PageShell><Loading /></PageShell>; }
  if (userQuery.isError || !userQuery.data) { return <PageShell><Error /></PageShell>; }

  return (
    <PageShell>
      <div className="page-container gap-xxxl">
        <section className="stack gap-xxl jc-center" style={{ flex: 0.2 }}>
          {/* <img
            src={mockUser.profile_picture_url}
            alt={mockUser.username}
            className="square-md"
          /> */}
          <div className="stack gap-lg">
            <Title order={2}>
              {userQuery.data.name}
            </Title>
            <p className="vertical-scroll" style={{ maxHeight: '150px' }}>
              {userQuery.data.bio}
            </p>
          </div>
        </section>
        <section className="stack gap-xxl">
          <div className="group grow ta-center">
            <LinkButton
              onClick={() => {
                setCurrentTab('reviews');
                setLocation(`/user/${id}/reviews`);
              }}
              active={currentTab === 'reviews'}
            >
              RESEÑAS
            </LinkButton>
            <LinkButton
              onClick={() => {
                setCurrentTab('lists');
                setLocation(`/user/${id}/lists`);
              }}
              active={currentTab === 'lists'}
            >
              LISTAS
            </LinkButton>
          </div>
          <div className="vertical-scroll">
          {
            currentTab === 'lists' && (
              <UserLists userId={id} />
            )
          }
          {
            currentTab === 'reviews' && (
              <UserReviews userId={id} />
            )
          }
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default User;
