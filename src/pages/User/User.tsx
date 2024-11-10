import { Button, Title } from '@mantine/core';
import LoremIpsum from 'react-lorem-ipsum';
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

const User = ({ id, initialTab }: { id: string; initialTab: string }) => {
  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [, setLocation] = useLocation();

  return (
    <PageShell>
      <div className="page-container gap-xxl">
        <section className="stack gap-xxl jc-center">
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
              <LoremIpsum p={2} />
            </p>
          </div>
        </section>
        <section className="stack gap-xl">
          <div className="group grow ta-center">
            <Button
              variant="transparent"
              c="black"
              onClick={() => {
                setCurrentTab('reviews');
                setLocation(`/user/${id}/reviews`);
              }}
            >
              RESEÑAS
            </Button>
            <Button
              variant="transparent"
              c="black"
              onClick={() => {
                setCurrentTab('lists');
                setLocation(`/user/${id}/lists`);
              }}
            >
              LISTAS
            </Button>
          </div>
          <div className="vertical-scroll" style={{ flex: 1 }}>
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
