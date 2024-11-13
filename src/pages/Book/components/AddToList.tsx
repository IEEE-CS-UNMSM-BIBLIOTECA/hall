import { Button, Checkbox, Modal } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ListTypeAddDocument } from '@/types';
import DynamicText from '@/components/DynamicText';
import Loading from '@/components/Loading';
import { addDocumentToList, getListsOfUser, removeDocumentFromList, renameList } from '@/services/api';

const mockLists: ListTypeAddDocument[] = [
  {
    id: 1,
    title: 'Lista 1',
    has_document: true,
  },
  {
    id: 2,
    title: 'Lista 2',
    has_document: false,
  },
  {
    id: 3,
    title: 'Lista 3',
    has_document: true,
  },
  {
    id: 4,
    title: 'Lista 4',
    has_document: false,
  },
  {
    id: 5,
    title: 'Lista 5',
    has_document: true,
  },
  {
    id: 6,
    title: 'Lista 6',
    has_document: false,
  },
  {
    id: 7,
    title: 'Lista 7',
    has_document: true,
  },
  {
    id: 8,
    title: 'Lista 8',
    has_document: false,
  },
  {
    id: 9,
    title: 'Lista 9',
    has_document: true,
  },
  {
    id: 10,
    title: 'Lista 10',
    has_document: false,
  },
];

const List = ({ document_id, listData, queryClient }: {
  document_id: number;
  listData: ListTypeAddDocument;
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  const addToListMutation = useMutation({
    mutationFn: () => addDocumentToList(document_id, listData.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists_of_user'] }),
  });

  const removeFromListMutation = useMutation({
    mutationFn: () => removeDocumentFromList(document_id, listData.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lists_of_user'] }),
  });

  const renameListMutation = useMutation({
    mutationFn: (newTitle: string) => renameList(listData.id, newTitle),
  });

  const onCheckboxChange = async ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = currentTarget;
    if (checked === true) {
      await addToListMutation.mutateAsync();
    } else if (checked === false) {
      await removeFromListMutation.mutateAsync();
    }
  };

  const onListRename = async (newTitle: string) => {
    await renameListMutation.mutateAsync(newTitle);
  };

  return (
    <div className="group gap-xs ai-center">
      <Checkbox
        checked={listData.has_document}
        onChange={onCheckboxChange}
      />
      <DynamicText
        value={listData.title}
        setValue={onListRename}
      />
    </div>
  );
};

const AddToList = ({ document_id, opened, onClose }: {
  document_id: number;
  opened: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  // const listsQuery = useQuery({
  //   queryKey: ['lists_of_user'],
  //   queryFn: getListsOfUser,
  // });

  const listsQuery = { data: mockLists, isPending: false, isError: false };
  const [filterInput, setFilterInput] = useState('');

  if (listsQuery.isPending) {
    return (
      <Modal opened={opened} onClose={onClose}>
        <Loading />
      </Modal>
    );
  }

  if (listsQuery.isError) {
    return null;
  }

  const filteredLists = listsQuery.data.filter((list) => (
    list.title.toLowerCase().includes(filterInput.toLowerCase())
  ));

  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="stack gap-lg jc-space-between">
        <input
          className="unstyled fz-sm"
          placeholder="Busca entre todas tus listas"
          value={filterInput}
          onChange={(e) => setFilterInput(e.currentTarget.value)}
        />
        <div className="vertical-scroll" style={{ height: 300 }}>
        {
          filteredLists.map((listData) => (
            <List
              key={listData.id}
              document_id={document_id}
              listData={listData}
              queryClient={queryClient}
            />
          ))
        }
        </div>
        <div className="group gap-xs jc-space-between">
          <Button>
            NUEVA LISTA
          </Button>
          <Button onClick={onClose}>
            CERRAR
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToList;
