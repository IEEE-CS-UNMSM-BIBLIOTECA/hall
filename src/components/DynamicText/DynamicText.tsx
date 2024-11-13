import { IconCheck, IconX, IconPencil } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useHover } from '@mantine/hooks';

const DynamicText = ({ value, setValue, initialEditing }: {
  value: string;
  setValue: (value: string) => Promise<void>;
  initialEditing?: boolean;
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [editing, setEditing] = useState(initialEditing || false);
  const { hovered, ref } = useHover();
  const inputRef = useRef<HTMLInputElement>(null);

  const save = async (newValue: string) => {
    await setValue(newValue);
    stopEditing();
  };

  const startEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const stopEditing = () => {
    setInternalValue(value);
    setEditing(false);
  };

  return (
    <div ref={ref} className="group jc-space-between ai-center flex-1 gap-xs">
      <input
        value={editing ? internalValue : value}
        ref={inputRef}
        className="flex-1 unstyled"
        onChange={(e) => setInternalValue(e.currentTarget.value)}
        onBlur={stopEditing}
        disabled={!editing}
        onKeyDown={(e) => e.key === 'Enter' && save(internalValue)}
        style={{ height: 40, color: 'black' }}
      />
      {
        editing
        ? <div className="group gap-xs">
            <IconCheck
              className="icon button xs"
              onClick={() => save(internalValue)}
              cursor="pointer"
              title="Guardar"
            />
            <IconX
              className="icon button xs"
              onClick={stopEditing}
              cursor="pointer"
              title="Cancelar"
            />
          </div>
        : <IconPencil
            className="icon button xs"
            opacity={hovered ? 1 : 0}
            onClick={startEditing}
            cursor="pointer"
            title="Cambiar nombre"
          />
      }
    </div>
  );
};

export default DynamicText;
