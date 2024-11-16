import { TextInput, PasswordInput, Button, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { AxiosError } from 'axios';
import PageShell from '@/layout/PageShell';
import { SigninPayload } from '@/types';
import { signIn } from '@/services/api';

const Signin = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const [, setLocation] = useLocation();

  const signinMutation = useMutation({
    mutationFn: (data: SigninPayload) => signIn(data),
    onSuccess: () => {},
    onError: ({ status }: AxiosError) => {
      if (status === 401) {
        form.setErrors({ username: 'Usuario o contraseña incorrectos' });
      }
    },
  });

  const handleSignin = () => form.onSubmit(async (values: SigninPayload) => {
    const { data } = await signinMutation.mutateAsync(values);
    localStorage.setItem('token', data.token);
    setLocation('/');
  });

  return (
    <PageShell>
      <form
        className="stack gap-lg jc-center"
        style={{ marginLeft: 'auto', marginRight: 'auto', height: '100dvh' }}
        onSubmit={handleSignin()}
      >
        <Title order={3} mb="sm">
          Bienvenido de vuelta
        </Title>

        <div className="stack gap-xs">
          <TextInput
            key={form.key('username')}
            {...form.getInputProps('username')}
            label="Nombre de usuario"
            placeholder="Tu usuario"
            required
          />
          <PasswordInput
            key={form.key('password')}
            {...form.getInputProps('password')}
            label="Contraseña"
            placeholder="Tu contraseña"
            required
          />
        </div>

        <Button
          my="md"
          variant="primary"
          type="submit"
        >
          INICIAR SESIÓN
        </Button>

        <p className="ta-center fz-sm">
          ¿Aún no tienes cuenta?{' '}
          <a href="/signup" className="explicit">
            Regístrate
          </a>
        </p>
      </form>
    </PageShell>
  );
};

export default Signin;
