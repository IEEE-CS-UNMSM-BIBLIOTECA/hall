import PageShell from '@/layout/PageShell';
import { Text, TextInput, PasswordInput, Button, Stack, Group, Anchor } from '@mantine/core';
import { useState } from 'react';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Aquí podrías agregar la lógica para manejar el inicio de sesión
    // Por ejemplo, hacer una petición a tu backend con el username y password
    if (username && password) {
      alert(`Intentando iniciar sesión con usuario: ${username}`);
    } else {
      alert('Por favor, completa ambos campos.');
    }
  };

  return (
    <PageShell>
      <Group justify="center">
        <Stack style={{ width: '100%', maxWidth: '400px' }}>
          <Text ta={'center'} size="xl" fw={'bold'}>
            Bienvenido de vuelta
          </Text>

          <TextInput
            label="Username"
            placeholder="Tu usuario"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Contraseña"
            placeholder="Tu contraseña"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
          />

          <Button my={'lg'} variant="primary" type="submit">
            Iniciar sesión
          </Button>

          <Text ta={'center'}>
            ¿Aún no tienes cuenta?{' '}
            <Anchor href="/signin" c="blue">
              Regístrate
            </Anchor>
          </Text>
        </Stack>
      </Group>
    </PageShell>
  );
};

export default Signin;
