import { Button, Flex, Image, Text, Modal, Group, TextInput, Title } from "@mantine/core";
import { removeCookie } from "../../utils/Cookies";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";

export const Sidebar = ({ user }: { user: any }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [isLoading, setIsLoading] = useState(false)

	const handleClickDeconexion = () => {
		removeCookie('token')
		window.location.reload()
	}

	const handleClickEdit = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			close()
		}, 100);
	}

	return (
		<Flex
			direction='column'
			style={{
				borderRight: 'solid 2px black',
				width: '300px',
				height: '100%',
				color: 'white',
				minWidth: '200px',
			}}>
			<Modal opened={opened} onClose={close}>
				<Flex direction={'column'} style={{ width: '100%', justifyContent: 'center' }}>
					<Title>Edition du profile</Title>
					<br />
					<TextInput
						placeholder="Username"
						label="Username"
						withAsterisk
					/>
					<TextInput
						placeholder="Mot de pass"
						label="Mot de pass"
						withAsterisk
					/>
					<TextInput
						placeholder="Confirmer le mot de pass"
						label="Confirmer le mot de pass"
						withAsterisk
					/>
					<br />
					<Button loading={isLoading} onClick={handleClickEdit} color="dark">Valider</Button>
				</Flex>
			</Modal>
			<Flex
				direction='column'
				style={{
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '50px'
				}}>
				<Image
					radius="md"
					src={user.photoUrl ? user.photoUrl : "https://thumbs.dreamstime.com/b/jour-de-terre-d-environnement-dans-les-mains-des-arbres-cultivant-jeunes-plantes-bokeh-verdissent-la-main-femelle-fond-tenant-l-130247647.jpg"}
					alt="Random unsplash image"
					style={{
						width: '70%',
						minWidth: '100px'
					}}
				/>
				<br />
				<Text color='gray'>Username</Text>
				<Text color='black'>@{user.username}</Text>
				<br />
				<Text color='gray'>Prénom</Text>
				<Text color='black'>{user.firstname}</Text>
				<br />
				<Text color='gray'>Nom</Text>
				<Text color='black'>{user.lastname}</Text>
				<br />
				<Text color='gray'>Email</Text>
				<Text color='black'>{user.email}</Text>
				<br />
				<Group position="center">
					<Button color="dark" onClick={open}>Edit</Button>
				</Group>
			</Flex>
			<Flex style={{
				width: '100%',
				height: '100%',
				alignItems: 'end',
				justifyContent: 'center'
			}}>
				<Button onClick={handleClickDeconexion} color="red" style={{
					marginBottom: '50px'
				}}>Deconnexion</Button>

			</Flex>
		</Flex>
	)
}
