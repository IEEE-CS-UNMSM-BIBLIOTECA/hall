import { Box, Button, Center, Flex, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import PageShell from '@/layout/PageShell';
import BookSlider from '@/components/BookSlider';
import './Books.css';

const WORDS = ['cuando', 'como', 'donde', 'lo que'];

const LeftSection = ({ wordIndex }: { wordIndex: number }) => (
  <div style={{ justifyContent: 'center', display: 'flex' }}>
    <Stack flex={1} gap="xl" maw={400}>
      <Title>Lee {WORDS[wordIndex]} quieras.</Title>
      <Text>Descubre libros, recógelos cuando quieras. Sin costo.</Text>
      <Flex gap="sm" direction={{ base: 'column', xl: 'row' }}>
        <Button variant="primary" size="md" fullWidth>
          EMPIEZA HOY
        </Button>
        <Button size="md" fullWidth>
          INICIAR SESIÓN
        </Button>
      </Flex>
    </Stack>
  </div>
);

const Books = () => {
  const [wordIndex, setWord] = useState(0);

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
          gap={{ base: 'xl', md: 'var(--mantine-spacing-xxxl)' }}
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Box visibleFrom="md">
            <LeftSection wordIndex={wordIndex} />
          </Box>
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
              <Box hiddenFrom="md" mb="var(--mantine-spacing-xxl)">
                <LeftSection wordIndex={wordIndex} />
              </Box>
              <BookSlider />
            </Stack>
          </div>
        </Flex>
      </PageShell>
    </>
  );
};

export default Books;
