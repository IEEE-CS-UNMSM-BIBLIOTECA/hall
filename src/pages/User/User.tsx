import { Button, Title } from '@mantine/core';
// import LoremIpsum from 'react-lorem-ipsum';
import { useState } from 'react';
import { useLocation } from 'wouter';
import PageShell from '@/layout/PageShell';
import { UserType } from '@/types';
import UserLists from './components/UserLists';

const mockUser: UserType = {
  id: 1,
  username: 'johndoe',
  bio: 'I am a software engineer',
  profile_picture_url: 'https://placehold.it/500',
};

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

  return (
    <PageShell>
      <div className="page-container gap-xxxl">
        <section className="stack gap-xxl jc-center" style={{ flex: 0.2 }}>
          <img
            src={mockUser.profile_picture_url}
            alt={mockUser.username}
            className="square-md"
          />
          <div className="stack gap-lg">
            <Title order={2}>
              {mockUser.username}
            </Title>
            <p className="vertical-scroll" style={{ maxHeight: '150px' }}>
              {mockUser.bio}
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
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default User;
