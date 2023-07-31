import React, { useState } from 'react';
import { Flex, Button, Modal, TextInput, Title, Group, Textarea, Text } from '@mantine/core';
import { Card } from './Card';
import { Dropzone } from '@mantine/dropzone';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

export const ScreenOne = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [uploadedFileSample, setUploadedFileSample] = useState<File | null>(null);
  const [uploadedFileImage, setUploadedFileImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [number, setNumber] = useState<string>("")
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

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setUploadedFileSample(null);
    setUploadedFileImage(null);
  };

  const handleDropSample = (file: File[]) => {
    console.log(file[0])
    setUploadedFileSample(file[0]);
  };

  const handleDropImage = (file: File[]) => {
    console.log(file[0]);
    setUploadedFileImage(file[0]);
  }

  const handleUpload = () => {
    if (uploadedFileSample && title && description && number && price) {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('numberEdition', number);
      formData.append('price', price);
      formData.append('sample', uploadedFileSample);
      formData.append('tags', 'niska');
      formData.append('tags', 'rap');

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJmZDBiMTEzZWZkYzFiNGJjNTNlZjkiLCJlbWFpbCI6InRlc3RAYWFhLmNvbSIsInVzZXJuYW1lIjoidGVzdCIsImxhc3RuYW1lIjoidGVzdDIiLCJmaXJzdG5hbWUiOiJ0ZXN0MiIsInR5cGUiOiJ1c2VyIiwibGFuZ3VhZ2UiOiJmciIsImJpcnRoRGF0ZSI6IjE5OTQtMDMtMDRUMjM6MDA6MDAuMDAwWiIsInBob3RvVXJsIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9kL2Q5L05vZGUuanNfbG9nby5zdmcvMTIwMHB4LU5vZGUuanNfbG9nby5zdmcucG5nIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpc0NyZWF0b3IiOmZhbHNlLCJkZWxldGVkQXQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjVUMTM6NDA6MDEuOTcyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjVUMTM6NDA6MDEuOTcyWiIsIl9fdiI6MCwiaWF0IjoxNjkwODEzOTc3LCJleHAiOjE2OTA5MDAzNzd9.WC6Wjv717YfSTsAtkGN-TwX4if7w2H3dn62-UNRquuI`, // Ajoutez l'en-tête d'autorisation avec le bearer token
        },
      };
      axios.post('http://localhost:3000/api/nft', formData, config)
        .then(() => {
          setTimeout(() => {
            console.log("Delayed for 1 second.");
            notifications.show({
              title: 'Succes',
              message: "félicitation votre sample a bien été ajouté. 🤥",
              color: 'green',
              style: { backgroundColor: 'white' }
            })
            handleModalClose();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
      return
    } else {
      notifications.show({
        title: 'Erreur',
        message: "Veuillez renseigner l'intégralité des champs. 🤥",
        color: 'red',
        style: { backgroundColor: 'white' }
      })
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
        <Button color="dark" onClick={() => { setModalOpen(true); }}>
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
          <Flex direction='row'>
            <Dropzone style={{
              width:'50%'
            }} onDrop={handleDropSample} accept={['audio/*']} multiple={false}>
              {uploadedFileSample ? (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="blue">
                    File selected: {uploadedFileSample.name}
                  </Text>
                  <button onClick={handleUpload}>Upload MP3</button>
                </Group>
              ) : (
                <Group position="center" style={{ width:'100%', height: '100px', marginBottom: '20px' }}>
                  <Flex direction={'column'} style={{
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                    <Text>Sample</Text>
                    <Text style={{ textAlign: 'center' }} color="gray">
                      Choose a mp3 file or drag it here
                    </Text>
                  </Flex>
                </Group>
              )}
            </Dropzone>
            <Dropzone style={{
              width:'50%'
            }} onDrop={handleDropImage} accept={['image/*']} multiple={false}>
              {uploadedFileImage ? (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="blue">
                    File selected: {uploadedFileImage.name}
                  </Text>
                  <button onClick={handleUpload}>Upload Image</button>
                </Group>
              ) : (
                <Group position="center" style={{ width:'100%', height: '100px', marginBottom: '20px' }}>
                  <Flex direction={'column'} style={{
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                    <Text>Image</Text>
                    <Text style={{ textAlign: 'center' }} color="gray">
                      Choose a image file or drag it here
                    </Text>
                  </Flex>
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
            onChange={handleNumberChange}
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
