import React, { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
  Text,
  Flex,
  Title,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/Cookies";
import { AxiosService } from "../utils/AxiosService";

export const Login = () => {

  const navigate = useNavigate();

  const Login = async(username:string,password:string)=>{
    //@ts-ignore
    await AxiosService("POST","/auth/login", {username, password})
    .then(async (res: any )=>{
      console.log(res)
      if (res.message === 'Login successful') {
        await setCookie("token",res.token,"/")
        setIsLoading(false)
        navigate('/profile')
      } else if (res.message === 'Incorrect password') {
        notifications.show({
          title: 'Incorect',
          message: 'Mot de pass incorrect 🤥',
          color: 'red',
          style: { backgroundColor: 'white' }
        })
        setIsLoading(false)
      } else {
        notifications.show({
          title: 'Incorect',
          message: 'Utilisateur inconnu 🤥',
          color: 'red',
          style: { backgroundColor: 'white' }
        })
        setIsLoading(false)
      }
    }).catch((err: any)=>{
      // TODO: redirect to login page
      console.log(err)
    })
  }

  const matches = useMediaQuery('(min-width: 900px');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: any) => {
    setIsLoading(true)
    event.preventDefault();
    if (formData) {
      console.log(formData)
      setIsLoading(true)
      Login(formData.email, formData.password)
    } else
      notifications.show({
        title: 'Incorect',
        message: 'Utilisateur inconnu 🤥',
        color: 'red',
        style: { backgroundColor: 'white' }
      })
  };

  if (!matches)
    return (
      <Flex direction='column' style={{
        width: '100%',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <img
          style={{ position: 'absolute', top: 0, right: 0, marginRight: 10, marginTop: 60 }}
          src="https://cdn-icons-png.flaticon.com/128/8216/8216451.png" />
        <img
          style={{ position: 'absolute', bottom: 0, left: 0, marginRight: 100, marginBottom: 60 }}
          src="https://cdn-icons-png.flaticon.com/128/1438/1438096.png" />
        <form style={{
          width: '80%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }} onSubmit={handleSubmit}>
          <Title size='60px' >Se connecter</Title>
          <div style={{
            width: '70%',
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flex direction={'column'}
              style={{ justifyContent: 'center' }}>
              <Input
                icon={'U'}
                size="md"
                required
                name="email"
                type="text"
                placeholder="Username"
                value={formData.email}
                onChange={handleInputChange}
                style={{ marginTop: 15 }}
                radius="xl"
              />

              <PasswordInput
                icon={'P'}
                size="md"
                required
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                style={{ marginTop: 15 }}
                radius="xl"
              />
            </Flex>

            <div style={{ marginTop: 20 }}>
              <Button loading={isLoading} type="submit" radius="xl" fullWidth>
                Se connecter
              </Button>
            </div>
            <Flex direction='column' style={{ marginTop: '20px' }} >
              <Text>Déjà inscrit ? <a href="login">S'inscrire</a></Text>
              <Text>Mot de passe <a href="foget-password">oublié</a></Text>
            </Flex>
          </div>
        </form>
      </Flex>
    )
  return (
    <Flex>
      <Flex direction='column' style={{
        width: '50%',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <form style={{
          width: '80%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '90px'
        }} onSubmit={handleSubmit}>
          <Title size='60px' >Se connecter</Title>
          <div style={{
            width: '70%',
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
          }}>
            <Flex direction={'column'}
              style={{ justifyContent: 'center' }}>
              <Input
                icon={'U'}
                size="md"
                required
                name="email"
                type="text"
                placeholder="Username"
                value={formData.email}
                onChange={handleInputChange}
                style={{ marginTop: 15 }}
                radius="xl"
              />

              <PasswordInput
                icon={'P'}
                size="md"
                required
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                style={{ marginTop: 15 }}
                radius="xl"
              />
            </Flex>

            <div style={{ marginTop: 20 }}>
              <Button loading={isLoading} type="submit" radius="xl" fullWidth>
                Se connecter
              </Button>
            </div>
            <Flex direction='column' style={{ alignItems: 'center', marginTop: '20px' }}>
              <Text><a href="login">S'inscrire</a></Text>
              <Text>Mot de passe <a href="foget-password">oublié</a></Text>
            </Flex>
          </div>
        </form>
      </Flex>
      <Flex style={{
        width: '50%',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
        <Flex direction='column'
          style={{
            width: '550px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img style={{ position: 'absolute', top: 0, right: 0, marginRight: 100, marginTop: 120 }} src="https://cdn-icons-png.flaticon.com/128/8216/8216451.png" />
          <Title size='60px' style={{ marginBottom: '20px' }}>Bienvenue</Title>
          <Text style={{ textAlign: 'center' }} size='30px'>Découvrez l'essence de la créativité musical avec notre sélection exceptionnelle de samples. Conçu pour inspirer et tranformer votre musique en véritable chef-d'oeuvre auditif</Text>
          <img style={{ position: 'absolute', bottom: 0, left: 0, marginRight: 100, marginBottom: 100 }} src="https://cdn-icons-png.flaticon.com/128/1438/1438096.png" />
        </Flex>
      </Flex>
    </Flex>
  )
};
