import { Flex, Text } from "@mantine/core";



export const Card = ({title, price, description}:{title:string, price:string, description:string}) => {
    return (
        <Flex direction={'column'} style={{
            border:'solid 2px black',
            borderRadius:'15px',
            minWidth:'400px',
            width:'700px',
            height:'100px',
            padding:'40px',
            margin:'40px'
        }}>
            <Text>{title}</Text>
            <Text>{price}</Text>
            <Text>{description}</Text>
        </Flex>
    )
}