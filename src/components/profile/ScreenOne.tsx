import React, { useState } from 'react';
import { Flex, Button, Modal, TextInput, Title, Group, Textarea, Text } from '@mantine/core';
import { Card } from './Card';
import { Dropzone } from '@mantine/dropzone';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { AxiosService, AxiosServiceFormData } from '../../utils/AxiosService';

export const ScreenOne = ({ nft }: { nft?: { title: string, price: string, description: string }[] }) => {
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
      // formData.append('cover', uploadedFileImage)
      formData.append('tags', 'niska');
      formData.append('tags', 'rap');

      AxiosServiceFormData("POST", "/nft", formData)
      .then((res) => {
        console.log("res", res)
        setTimeout(() => {
          notifications.show({
            title: 'Succes',
            message: "félicitation votre sample a bien été ajouté. 🤥",
            color: 'green',
            style: { backgroundColor: 'white' }
          })
          handleModalClose();
        }, 1000);
      })
      .catch((err) => {
        console.log(err)
      })
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
        }}
      >
        <Flex
          direction="column"
          style={{
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {nft ? nft.map((nf: any) => (
            <Card key={nf._id} title={nf.title} price={nf.price} description={nf.description} />
          )) : <>Vous ne possedez pas encore de nft</>}
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
              width: '50%'
            }} onDrop={handleDropSample} accept={['audio/*']} multiple={false}>
              {uploadedFileSample ? (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="blue">
                    File selected: {uploadedFileSample.name}
                  </Text>
                  <button onClick={handleUpload}>Upload MP3</button>
                </Group>
              ) : (
                <Group position="center" style={{ width: '100%', height: '100px', marginBottom: '20px' }}>
                  <Flex direction={'column'} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
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
              width: '50%'
            }} onDrop={handleDropImage} accept={['image/*']} multiple={false}>
              {uploadedFileImage ? (
                <Group position="center" style={{ height: '100px', marginBottom: '20px' }}>
                  <Text style={{ textAlign: 'center' }} color="blue">
                    File selected: {uploadedFileImage.name}
                  </Text>
                  <button onClick={handleUpload}>Upload Image</button>
                </Group>
              ) : (
                <Group position="center" style={{ width: '100%', height: '100px', marginBottom: '20px' }}>
                  <Flex direction={'column'} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
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
