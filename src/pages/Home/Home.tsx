import { Button, Center, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import PageShell from '@/layout/PageShell';
import BookSlider from '@/components/BookSlider';
import './Home.css';

const WORDS = ['cuando', 'como', 'donde', 'lo que'];

const Home = () => {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWord((cur_word) => (cur_word + 1) % WORDS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <PageShell>
        <Flex
          w="100%"
          gap="var(--mantine-spacing-xxxl)"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'strech', md: 'center' }}
          justify="space-between"
        >
          <Stack flex={1} gap="lg" align="flex-start">
            <Title>
              Lee {WORDS[word]} quieras.
            </Title>
            <Text>
              Descubre libros, recógelos cuando quieras. Sin costo.
            </Text>
            <Group>
              <Button variant="primary" size="md">
                EMPIEZA HOY
              </Button>
              <Button size="md">
                INICIAR SESIÓN
              </Button>
            </Group>
          </Stack>
          <div
            style={{
              height: '100vh',
              flex: 2,
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            <Stack gap={0}>
              <Center h={100}>
                {/* <Text size="lg">
                  TEST
                </Text> */}
              </Center>
              <BookSlider />
            </Stack>
          </div>
        </Flex>
      </PageShell>
    </>
  );
};

export default Home;
