import React, { useState, useRef, useEffect } from 'react';
import { Flex, Button, Modal, TextInput, Title, Group, Textarea, Text } from '@mantine/core';
import { Card } from './Card';
import { Dropzone } from '@mantine/dropzone';
import axios from 'axios';
import fs from 'fs'

export const ScreenOne = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDrop = (files: File[]) => {
    console.log(files[0])
    setUploadedFile(files[0]);
  };

  const handleUpload = () => {
    if (uploadedFile) {
      const formData = new FormData();
  
      formData.append('title', title);
      formData.append('description', description);
      formData.append('numberEdition', '2');
      formData.append('price', price);
      formData.append('sample', uploadedFile);
      formData.append('tags', 'niska');
      formData.append('tags', 'rap');
  
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJmZDBiMTEzZWZkYzFiNGJjNTNlZjkiLCJlbWFpbCI6InRlc3RAYWFhLmNvbSIsInVzZXJuYW1lIjoidGVzdCIsImxhc3RuYW1lIjoidGVzdDIiLCJmaXJzdG5hbWUiOiJ0ZXN0MiIsInR5cGUiOiJ1c2VyIiwibGFuZ3VhZ2UiOiJmciIsImJpcnRoRGF0ZSI6IjE5OTQtMDMtMDRUMjM6MDA6MDAuMDAwWiIsInBob3RvVXJsIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9kL2Q5L05vZGUuanNfbG9nby5zdmcvMTIwMHB4LU5vZGUuanNfbG9nby5zdmcucG5nIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpc0NyZWF0b3IiOmZhbHNlLCJkZWxldGVkQXQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjVUMTM6NDA6MDEuOTcyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjVUMTM6NDA6MDEuOTcyWiIsIl9fdiI6MCwiaWF0IjoxNjkwMjkyNDQ2LCJleHAiOjE2OTAzNzg4NDZ9.O6wwKdV5TU_ewVFM_5Ac0JYPdEqekWkEPZiHljJA8nw`, // Ajoutez l'en-tête d'autorisation avec le bearer token
        },
      };
      axios.post('http://localhost:3000/api/nft', formData, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Flex
        direction="column"
        style={{
          alignItems: 'center',
          maxHeight: '65vh',
          overflow: 'auto',
        }}
      >
        <Flex
          direction="column"
          style={{
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <Card />
          <Card />
        </Flex>
      </Flex>
      <Flex
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Button color="dark" onClick={() => {setModalOpen(true);}}>
          +
        </Button>
      </Flex>

      <Modal opened={modalOpen} onClose={handleModalClose}>
        <Flex direction='column' style={{
          height: '500px',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <Title style={{
            marginBottom: '15px',
            textAlign: 'center',
          }}>Ajouter un sample</Title>
          <Flex direction='column'>
            <Dropzone onDrop={handleDrop} accept={['audio/*', 'image/*']} multiple={false}>
              {uploadedFile ? (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="blue">
                    File selected: {uploadedFile.name}
                  </Text>
                  <button onClick={handleUpload}>Upload File</button>
                </Group>
              ) : (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="gray">
                    Choose a file or drag it here
                  </Text>
                </Group>
              )}
            </Dropzone>
          </Flex>
          <TextInput
            onChange={handleTitleChange}
            placeholder="Titre"
            label="Titre"
          />
          <TextInput
            onChange={handlePriceChange}
            placeholder="Prix"
            label="Prix"
          />
          <TextInput
            onChange={handlePriceChange}
            placeholder="Nombre"
            label="Nombre de nft"
          />
          <Textarea
            style={{
              marginBottom: '15px'
            }}
            onChange={handleDescriptionChange}
            placeholder="Description"
            label="Description"
            withAsterisk
          />
          <Button onClick={handleUpload} color='dark'>Valider</Button>
        </Flex>
      </Modal>
    </>
  );
};

export const ScreenTwo = () => {
  return (
    <Flex
      direction="column"
      style={{
        width: '100%',
        alignItems: 'center',
        height: '50vh',
        maxHeight: '50vh',
        overflow: 'auto',
      }}
    >
      <Flex
        direction="column"
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      ></Flex>
    </Flex>
  );
};
