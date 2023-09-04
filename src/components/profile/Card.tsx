import { Button, Flex, Text, Modal, Group } from "@mantine/core";
import { Sample } from "../../Interface/Sample";
import { useDisclosure } from "@mantine/hooks";

export const Card = ({ nft }: { nft: Sample }) => {
	const [opened, { open, close }] = useDisclosure(false);

	const handleClickDelete = () => {
		console.log('delete')
		close()
	}

	console.log(nft)
	return (
		<Flex direction={'column'} style={{
			border: 'solid 2px gray',
			borderRadius: '15px',
			minWidth: '400px',
			width: '700px',
			padding: '30px',
			margin: '40px',
			position: 'relative'
		}}>
			<Text><Text color="gray">Titre: </Text>{nft.title}</Text>
			<Text><Text color="gray">Prix: </Text>{nft.price} €</Text>
			<Text><Text color="gray">Quantity: </Text>{nft.numberEdition}</Text>
			<Text><Text color="gray">Description: </Text>{nft.description}</Text>
			<Flex direction={'row'}>
				<Text><Text color="gray">Tags: </Text>{nft.tags.map((tag, index) => {
					if (index + 1 !== nft.tags.length)
						return (tag.concat(','))
					else
						return (tag)
				})}</Text>
			</Flex>
			<Flex style={{
				width: '100%',
			}}>
				<Modal display={'flex'} opened={opened} onClose={close} withCloseButton={false}>
					<Flex style={{ justifyContent: 'center', paddingTop: '15px' }}>
						Êtes-vous sur de vouloir supprimer ce nft ?
					</Flex>
					<Flex style={{
						width: '100%',
						height: '100px',
						justifyContent: 'space-evenly',
						alignItems: 'center'
					}}>
						<Button color="green" onClick={handleClickDelete}>Oui</Button>
						<Button color="red" onClick={close}>Non</Button>
					</Flex>
				</Modal>
				<Flex style={{ width: '100%', justifyContent: 'end' }}>
					<Button color="red" onClick={open}>x</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
