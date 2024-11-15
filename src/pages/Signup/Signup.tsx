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
import { IconX } from '@tabler/icons-react';

const Signup = () => {
  // Estado único para almacenar todos los datos del formulario
  const [formData, setFormData] = useState({
    user_name: '',
    gender: '',
    full_name: '',
    bio: '',
    password: '',
    confirm_password: '',
    address: '',
    birth_date: '',
    phone: '',
    email: '',
    image: null as string | null,
  });
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 200; // Límite de caracteres para la biografía

  // Opciones de género que vienen de la base de datos
  const genderOptions = [
    { value: '1', label: 'Hombre' },
    { value: '2', label: 'Mujer' },
    { value: '3', label: 'No especificado' },
    { value: '4', label: 'No binario' },
  ];

  // Manejar cambios en los campos de texto
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string | null) => {
    if (value !== null) {
      setFormData({ ...formData, gender: value });
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, bio: event.target.value });
  };

  // Manejar la imagen de perfil
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
        setFormData({ ...formData, image: reader.result as string });
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

    // Limpiar la imagen del estado
    setFormData({ ...formData, image: null });

    // Limpiar el valor del input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Restablecer el input de archivo
    }

    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // 1. Validar si las contraseñas son iguales
    if (formData.password !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // 2. Validar fecha de nacimiento (al menos 13 años)
    const birthDate = new Date(formData.birth_date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 13) {
      alert('Debes tener al menos 13 años para registrarte');
      return;
    }

    // 3. Validar el nombre de usuario (mínimo 2 caracteres)
    if (formData.user_name.length < 2) {
      alert('El nombre de usuario debe tener al menos 2 caracteres');
      return;
    }

    // 4. Validar el formato del email (aunque ya lo validas en el formulario, puedes agregar una verificación extra)
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('El formato del correo electrónico no es válido');
      return;
    }

    try {
      const dataToSend = {
        username: formData.user_name,
        gender_id: parseInt(formData.gender),
        name: formData.full_name,
        bio: formData.bio.trim() === '' ? null : formData.bio, // Enviar null si está vacío
        password: formData.password,
        address: formData.address,
        birth_date: formData.birth_date,
        mobile_phone: formData.phone,
        email: formData.email,
        profile_picture_url:
          fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]
            ? fileInputRef.current.files[0]
            : null, // Aquí lo puedes manejar dependiendo de tu backend
      };

      const response = await fetch('http://143.198.142.139:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especificamos que estamos enviando JSON
        },
        body: JSON.stringify(dataToSend), // Convertimos el objeto a JSON
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      alert('¡Registro exitoso!');
      window.location.href = '/books'; // Redirigir a /books

      console.log('Datos enviados con éxito');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        gap={{ base: 'sm', md: 'xl' }}
        direction="column"
        align="center"
        py={{ base: '50px', md: '75px' }}
        px={{ base: '100px', md: '150px' }}
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
                src={formData.image || 'https://placehold.co/250'}
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
              {formData.image && (
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
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  placeholder="Escribe tu nombre de usuario"
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Género"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  placeholder="Selecciona tu género"
                  data={genderOptions} // Usamos las opciones de género
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Nombres y Apellidos"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Escribe tu nombre completo"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Correo Electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Escribe tu correo electrónico"
                  required
                  type="email" // Tipo de campo para correo electrónico
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Biografía"
                  name="bio"
                  value={formData.bio}
                  onChange={handleBioChange}
                  placeholder="Escribe algo sobre ti"
                  minRows={3}
                  autosize
                  maxLength={maxLength}
                />
                <Text size="xs" c="gray" style={{ textAlign: 'right' }}>
                  {formData.bio.length}/{maxLength}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput
                  label="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Escribe tu contraseña"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput
                  label="Repite Contraseña"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  placeholder="Repite tu contraseña"
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Escribe tu dirección"
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Fecha de Nacimiento"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  placeholder="DD/MM/AAAA"
                  type="date"
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Escribe tu número de teléfono"
                  required
                />
              </Grid.Col>
            </Grid>
          </Box>
        </Flex>

        <Button mt="xl" type="submit" size="lg" variant="primary">
          Registrarme
        </Button>
        <Text
          mt="lg"
          style={{
            alignSelf: 'center',
          }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Anchor href="/signin" c="blue">
            Inicia sesión aquí
          </Anchor>
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
