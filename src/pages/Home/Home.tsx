import { Box, Button, Flex, Group, Stack, Text, Title } from '@mantine/core';
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
          gap="var(--mantine-spacing-xxl)"
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
          <Box
            flex={2}
            h="100vh"
            py="var(--mantine-spacing-xxl)"
            style={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            <BookSlider />
          </Box>
        </Flex>
      </PageShell>
    </>
  );
};

export default Home;
