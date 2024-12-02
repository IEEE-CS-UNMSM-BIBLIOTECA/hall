import { Button, Checkbox, Modal, Rating, Textarea, TextInput } from '@mantine/core';
import { hasLength, isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateReviewPayload } from '@/types';
import { addReview } from '@/services/api';

const CreateReview = ({ document_id, opened, onClose }: {
  document_id: number,
  opened: boolean,
  onClose: () => void
}) => {
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rating: 0,
      title: '',
      content: '',
      spoiler: false,
    },

    validate: {
      title: hasLength({ min: 1, max: 75 }, 'El título debe tener entre 1 y 75 caracteres'),
      content: isNotEmpty('El contenido no puede estar vacío'),
      rating: isInRange({ min: 1 }, 'La calificación debe ser mayor a 0'),
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: (data: CreateReviewPayload) => addReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', { document_id }] });
      queryClient.invalidateQueries({ queryKey: ['book', { id: document_id }] });
    },
  });

  const handleSubmit = () => form.onSubmit(async (values) => {
    const data = {
      document_id,
      // todo: delete user_id
      user_id: 22,
      ...values,
    };
    await addReviewMutation.mutateAsync(data);
    onClose();
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
    >
      <form className="stack gap-md" onSubmit={handleSubmit()}>
        <div className="stack">
          <p className="fz-sm">Calificación</p>
          <Rating
            size="md"
            key={form.key('rating')}
            {...form.getInputProps('rating')}
          />
          <p className="fz-xs" style={{ color: 'var(--mantine-color-error)' }}>
            {form.errors?.rating}
          </p>
        </div>
        <div className="stack flex-1">
          <p className="fz-sm">Título</p>
          <TextInput
            placeholder="Me gustó"
            key={form.key('title')}
            {...form.getInputProps('title')}
          />
        </div>
        <div className="stack flex-1">
          <p className="fz-sm">Contenido</p>
          <Textarea
            placeholder="Me gustó mucho este libro porque..."
            minRows={4}
            maxRows={4}
            key={form.key('content')}
            {...form.getInputProps('content')}
          />
        </div>
        <Checkbox
          className="py-xs"
          label="Marcar como spoiler"
          key={form.key('spoiler')}
          {...form.getInputProps('spoiler', { type: 'checkbox' })}
        />
        <div className="group jc-space-between">
          <Button onClick={onClose}>
            CANCELAR
          </Button>
          <Button variant="primary" type="submit">
            PUBLICAR
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateReview;
