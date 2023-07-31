import { Button, Flex, Image, Text } from "@mantine/core";

export const Sidebar = () => {
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
			<Flex
				direction='column'
				style={{
					width: '100%',
					height: '300px',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '50px'
				}}>
				<Image
					radius="md"
					src="https://thumbs.dreamstime.com/b/jour-de-terre-d-environnement-dans-les-mains-des-arbres-cultivant-jeunes-plantes-bokeh-verdissent-la-main-femelle-fond-tenant-l-130247647.jpg"
					alt="Random unsplash image"
					style={{
						width:'70%',
						minWidth:'100px'
					}}
				/>
				<Text color='black'>@UserName</Text>
				<Text color='black'>Description</Text>
			</Flex>
			<Flex style={{
				width:'100%',
				height:'100%',
				alignItems:'end',
				justifyContent:'center'
			}}>
				<Button color="dark" style={{
					marginBottom:'50px'
				}}>Deconnexion</Button>
			</Flex>
		</Flex>
	)
}