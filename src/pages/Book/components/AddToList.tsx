import { Button, Checkbox, Modal } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ListAddDocument } from '@/types';
import DynamicText from '@/components/DynamicText';
import Loading from '@/components/Loading';
import {
  addDocumentToList,
  getListsOfUser,
  createList,
  deleteDocumentFromList,
  renameList,
} from '@/services/api';
import Error from '@/components/Error';

const List = ({
  document_id,
  listData,
  queryClient,
}: {
  document_id: number;
  listData: ListAddDocument;
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  const addToListMutation = useMutation({
    mutationFn: () => addDocumentToList(document_id, listData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists', { user: 'self' }] });
    },
  });

  const removeFromListMutation = useMutation({
    mutationFn: () => deleteDocumentFromList(document_id, listData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists', { user: 'self' }] });
    },
  });

  const renameListMutation = useMutation({
    mutationFn: (newTitle: string) => renameList(listData.id, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists', { user: 'self' }] });
    },
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
    console.log('newTitle', newTitle);
    await renameListMutation.mutateAsync(newTitle);
  };

  return (
    <div className="group gap-xs ai-center">
      <Checkbox checked={listData.has_document} onChange={onCheckboxChange} />
      <DynamicText value={listData.title} setValue={onListRename} />
    </div>
  );
};

const Lists = ({
  lists,
  document_id,
  queryClient,
}: {
  document_id: number;
  lists: ListAddDocument[];
  queryClient: ReturnType<typeof useQueryClient>;
}) => {
  if (lists.length === 0) {
    return (
      <p
        className="stack jc-center ai-center c-dimmed fz-sm py-xxl"
        style={{ height: 300 }}
      >
        No hay listas que mostrar
      </p>
    );
  }

  return (
    <div className="vertical-scroll" style={{ height: 300 }}>
      {lists.map((listData) => (
        <List
          key={listData.id}
          document_id={document_id}
          listData={listData}
          queryClient={queryClient}
        />
      ))}
    </div>
  );
};

const AddToList = ({
  document_id,
  opened,
  onClose,
}: {
  document_id: number;
  opened: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const listsQuery = useQuery({
    queryKey: ['lists', { user: 'self' }],
    queryFn: () => getListsOfUser(document_id),
  });

  const newListMutation = useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists', { user: 'self' }] });
    },
  });

  const [filterInput, setFilterInput] = useState('');

  if (listsQuery.isPending) {
    return (
      <Modal opened={opened} onClose={onClose}>
        <Loading />
      </Modal>
    );
  }

  if (listsQuery.isError) {
    return (
      <Modal opened={opened} onClose={onClose}>
        <div className="stack gap-sm ai-center">
          <Error />
          <Button onClick={onClose}>CERRAR</Button>
        </div>
      </Modal>
    );
  }

  const filteredLists = listsQuery.data.filter((list) =>
    list.title.toLowerCase().includes(filterInput.toLowerCase())
  );

  const handleNewList = async () => {
    await newListMutation.mutateAsync();
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="stack gap-lg jc-space-between">
        <input
          className="unstyled fz-sm"
          placeholder="Busca entre todas tus listas"
          value={filterInput}
          onChange={(e) => setFilterInput(e.currentTarget.value)}
        />
        <Lists lists={filteredLists} document_id={document_id} queryClient={queryClient} />
        <div className="group gap-xs jc-space-between">
          <Button onClick={handleNewList}>NUEVA LISTA</Button>
          <Button onClick={onClose}>CERRAR</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToList;
