import { Button, Grid, PasswordInput, Select, Textarea, TextInput, Title } from '@mantine/core';
// import { Dropzone } from '@mantine/dropzone';
import { hasLength, isEmail, matches, useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { signUp } from '@/services/api';
import { SignupPayload } from '@/types';
import PageShell from '@/layout/PageShell';

const genderData = [
  { value: '1', label: 'Masculino' },
  { value: '2', label: 'Femenino' },
  { value: '3', label: 'Prefiero no decirlo' },
  { value: '4', label: 'Otro' },
];

const Signup = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
      email: '',
      name: '',
      birth_date: '',
      bio: '',
      address: '',
      mobile_phone: '',
      gender_id: '0',
    },
    validate: {
      username: hasLength({ min: 1, max: 20 }, 'El nombre de usuario debe tener entre 1 y 20 caracteres'),
      password: matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'),
      confirm_password: (value, values) => values.password === value ? null : 'Las contraseñas no coinciden',
      email: isEmail('El correo electrónico no es válido'),
      name: hasLength({ min: 1, max: 100 }, 'El nombre debe tener entre 1 y 100 caracteres'),
      birth_date: (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          return 'La fecha de nacimiento no es válida';
        }
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
        return date < thirteenYearsAgo ? null : 'Debes tener al menos 13 años para registrarte';
      },
      address: hasLength({ min: 1, max: 100 }, 'La dirección debe tener entre 1 y 100 caracteres'),
      mobile_phone: matches(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, 'El número de teléfono no es válido'),
    },
  });

  const [, setLocation] = useLocation();

  const registerMutation = useMutation({
    mutationFn: (data: SignupPayload) => signUp(data),
  });

  const handleSubmit = () => form.onSubmit(async (values) => {
    const data: SignupPayload = {
      username: values.username,
      password: values.password,
      email: values.email,
      name: values.name,
      birth_date: values.birth_date,
      address: values.address,
      mobile_phone: values.mobile_phone,
      gender_id: Number(values.gender_id),
    };
    await registerMutation.mutateAsync(data);
    setLocation('/signin');
  });

  return (
    <PageShell>
      <div
        className="stack ai-center gap-xxl jc-center"
        style={{ marginLeft: 'auto', marginRight: 'auto', height: '100dvh' }}
      >
        <Title order={4}>
          Crea tu cuenta
        </Title>
        <form
          className="stack gap-xxl ai-center"
          onSubmit={handleSubmit()}
        >
          <div className="group gap-xl ai-start">
            {/* <Dropzone
              className="stack ai-center jc-center ta-center fz-sm c-dimmed"
              w={200}
              h={200}
              bg="gray.3"
              onDrop={() => {}}
            >
              <p style={{ maxWidth: 130 }}>
                Presiona o arrastra para subir
              </p>
            </Dropzone> */}
            <Grid maw={700}>
              <Grid.Col span={6}>
                <TextInput
                  key={form.key('username')}
                  label="Nombre de Usuario"
                  name="user_name"
                  placeholder="Escribe tu nombre de usuario"
                  required
                  {...form.getInputProps('username')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  key={form.key('gender_id')}
                  label="Género"
                  placeholder="Selecciona tu género"
                  data={genderData}
                  required
                  {...form.getInputProps('gender_id')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  key={form.key('name')}
                  label="Nombres y Apellidos"
                  name="full_name"
                  placeholder="Escribe tu nombre completo"
                  required
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  key={form.key('email')}
                  label="Correo Electrónico"
                  name="email"
                  placeholder="Escribe tu correo electrónico"
                  required
                  type="email"
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  key={form.key('bio')}
                  label="Biografía"
                  name="bio"
                  placeholder="Escribe algo sobre ti"
                  minRows={3}
                  maxRows={3}
                  {...form.getInputProps('bio')}
                />
              </Grid.Col>
              <Grid.Col>
                <PasswordInput
                  key={form.key('password')}
                  label="Contraseña"
                  name="password"
                  placeholder="Escribe tu contraseña"
                  required
                  {...form.getInputProps('password')}
                />
              </Grid.Col>
              <Grid.Col>
                <PasswordInput
                  key={form.key('confirm_password')}
                  label="Repite Contraseña"
                  name="confirm_password"
                  placeholder="Repite tu contraseña"
                  required
                  {...form.getInputProps('confirm_password')}
                />
              </Grid.Col>
              <Grid.Col>
                <TextInput
                  key={form.key('address')}
                  label="Dirección"
                  name="address"
                  placeholder="Escribe tu dirección"
                  required
                  {...form.getInputProps('address')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  key={form.key('birth_date')}
                  label="Fecha de Nacimiento"
                  name="birth_date"
                  placeholder="DD/MM/AAAA"
                  type="date"
                  required
                  {...form.getInputProps('birth_date')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  key={form.key('mobile_phone')}
                  label="Teléfono"
                  name="phone"
                  placeholder="Escribe tu número de teléfono"
                  required
                  {...form.getInputProps('mobile_phone')}
                />
              </Grid.Col>
            </Grid>
          </div>
          <Button
            variant="primary"
            type="submit"
          >
            REGISTRARSE
          </Button>
        </form>
      </div>
    </PageShell>
  );
};

export default Signup;
