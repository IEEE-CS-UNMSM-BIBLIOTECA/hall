import { Button, Checkbox, Modal, Rating, Textarea, TextInput } from '@mantine/core';

const CreateReview = ({ opened, onClose }: {
  opened: boolean,
  onClose: () => void
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
    >
      <div className="stack gap-md">
        <div className="stack">
          <p className="fz-sm">Calificación</p>
          <Rating size="md" />
        </div>
        <div className="stack flex-1">
          <p className="fz-sm">Título</p>
          <TextInput
            placeholder="Me gustó"
          />
        </div>
        <div className="stack flex-1">
          <p className="fz-sm">Contenido</p>
          <Textarea
            placeholder="Me gustó mucho este libro porque..."
            minRows={4}
            maxRows={4}
          />
        </div>
        <Checkbox
          className="py-xs"
          label="Marcar como spoiler"
        />
        <div className="group jc-space-between">
          <Button>
            CERRAR
          </Button>
          <Button variant="primary">
            PUBLICAR
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateReview;
