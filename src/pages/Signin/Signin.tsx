import { useState, useRef } from 'react';
import {
  TextInput,
  Select,
  Textarea,
  PasswordInput,
  Button,
  Box,
  Flex,
  Grid,
  Text,
  Anchor,
} from '@mantine/core';
import PageShell from '@/layout/PageShell';
import { IconX } from '@tabler/icons-react';

const Signin = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const maxLength = 200; // Límite de caracteres para la biografía
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      // Verificar el tamaño del archivo (3 MB)
      if (file.size > 3 * 1024 * 1024) {
        setError('La imagen no debe exceder 3 MB');
        setTimeout(() => setError(null), 4000);
        return;
      }

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          setImage(reader.result as string);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setError(null);
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImage(null);
    setError(null);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return (
    <PageShell>
      <Flex
        gap={{ base: 'sm', md: 'xl' }}
        direction="column"
        align="center"
        py={{ base: '75px', md: '100px' }}
        px={{ base: '75px', md: '100px' }}
      >
        {/* Título del formulario */}
        <Text size="xl" fw={700} mb="md">
          Crea una cuenta
        </Text>

        <Flex
          gap={{ base: 'sm', md: 'xl' }}
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          {/* Columna Izquierda */}
          <Box
            style={{
              flex: 0.4,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Foto de perfil</div>
            <div style={{ position: 'relative', width: 250, height: 250 }}>
              <img
                src={image || 'https://placehold.co/250'}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '2px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
              />
              {image && (
                <div
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <IconX size={20} color="white" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 1,
                }}
                onChange={handleImageChange}
              />
            </div>
            {error && (
              <Text
                c="red"
                style={{
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                {error}
              </Text>
            )}
          </Box>

          {/* Columna Derecha */}
          <Box style={{ flex: 0.6 }}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Nombre de Usuario"
                  placeholder="Escribe tu nombre de usuario"
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Género"
                  placeholder="Selecciona tu género"
                  data={['Masculino', 'Femenino', 'Otro']}
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Nombres y Apellidos"
                  placeholder="Escribe tu nombre completo"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Biografía"
                  placeholder="Escribe algo sobre ti"
                  minRows={3}
                  autosize
                  maxLength={maxLength}
                  value={bio}
                  onChange={handleBioChange}
                />
                <Text size="xs" color="gray" style={{ textAlign: 'right' }}>
                  {bio.length}/{maxLength}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput label="Contraseña" placeholder="Escribe tu contraseña" required />
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput
                  label="Repite Contraseña"
                  placeholder="Repite tu contraseña"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Dirección" placeholder="Escribe tu dirección" required />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona tu fecha de nacimiento"
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Número de Teléfono"
                  placeholder="Escribe tu número de teléfono"
                  required
                />
              </Grid.Col>
            </Grid>
          </Box>
        </Flex>

        {/* Botón de Registrarse */}
        <Button variant="primary" size="md">
          Registrarse
        </Button>

        {/* Enlace para iniciar sesión */}
        <Text mt="lg">
          ¿Ya tienes un usuario? <Anchor href="/signup">Iniciar sesión</Anchor>
        </Text>
      </Flex>
    </PageShell>
  );
};

export default Signin;
