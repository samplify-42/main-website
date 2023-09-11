import { Button, Flex, Text, Modal, Group, Image } from "@mantine/core";
import { Sample } from "../../Interface/Sample";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const CardBuy = ({ nft }: { nft: Sample }) => {
	const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState()

	const handleClickBuy = () => {
		console.log()
		close()
	}

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
			<Text><Text color="gray">Prix: </Text>{nft.price} Etherum</Text>
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
			<br />
			<Flex style={{ justifyContent: 'center' }}>
				<audio crossOrigin='anonymous' controls src={nft.sampleUrl}></audio>
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
						<Button color="green" onClick={handleClickBuy}>Oui</Button>
						<Button color="red" onClick={close}>Non</Button>
					</Flex>
				</Modal>
				<Flex style={{ width: '100%', justifyContent: 'end' }}>
					<Button color="green" onClick={() => {open()}}>acheter</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
