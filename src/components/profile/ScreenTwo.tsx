import React, { useState } from 'react';
import { Flex, Button, Modal, TextInput, Title, Group, Textarea, Text } from '@mantine/core';
import { Card } from './Card';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { AxiosServiceFormData } from '../../utils/AxiosService';
import { Sample } from '../../Interface/Sample';

export const ScreenTwo = ({ nft, setNft }: { nft: Sample[], setNft: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedFileSample, setUploadedFileSample] = useState<File | null>(null);
  const [uploadedFileImage, setUploadedFileImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const [isLoading, setIsLoading] = useState(false);

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
    setQuantity(event.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setUploadedFileSample(null);
    setUploadedFileImage(null);
  };

  const handleDropSample = (file: File[]) => {
    setUploadedFileSample(file[0]);
  };

  const handleDropImage = (file: File[]) => {
    setUploadedFileImage(file[0]);
  }

  const handleUpload = () => {
    if (uploadedFileSample && title && description && quantity && price) {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('numberEdition', quantity);
      formData.append('price', price);
      formData.append('sample', uploadedFileSample);
      // formData.append('cover', uploadedFileImage);
      formData.append('tags', 'niska');
      formData.append('tags', 'rap');
      setIsLoading(true);
      AxiosServiceFormData("POST", "/nft", formData)
        .then((res) => {
          setIsLoading(false);
          if (uploadedFileSample) {
            console.log("res", res)
            handleModalClose();
            const tmpNfts = nft;
              const newSample: Sample = {
                title: title,
                price: price,
                description: description,
                sample: uploadedFileSample,
                numberEdition: quantity,
                tags: [""],
              }
              tmpNfts && tmpNfts.push(newSample);
              setNft(tmpNfts)
              notifications.show({
                title: 'Succes',
                message: "félicitation, votre sample a bien été ajouté ! 🤥",
                color: 'green',
                style: { backgroundColor: 'white' }
              })
              console.log("okok")
          }
        })
        .catch((err) => {
          console.log(err)
          notifications.show({
            title: 'Erreur',
            message: "Votre sample n'a pas pu être ajouté. 🤥",
            color: 'red',
            style: { backgroundColor: 'white' }
          })
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
            height: '800px',
            overflow: 'auto',
          }}
        >
          {nft ? nft.map((nf: Sample, index) => (
            <Card key={index} nft={nf} />
          )).reverse() : <>Vous ne possedez pas encore de nft</>}
        </Flex>
        <Button color="dark" onClick={() => { setModalOpen(true); }}>
          +
        </Button>
      </Flex>

      <Modal style={{ zIndex: '999' }} opened={modalOpen} onClose={handleModalClose}>
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
          <Button loading={isLoading} onClick={handleUpload} color='dark'>Valider</Button>
        </Flex>
      </Modal>
    </>
  );
};
