import { Flex, Text } from "@mantine/core";



export const Card = ({title, price, description}:{title:string, price:string, description:string}) => {
    return (
        <Flex direction={'column'} style={{
            border:'solid 2px black',
            borderRadius:'15px',
            width:'800px',
            height:'100px',
            marginTop:'40px'
        }}>
            <Text>{title}</Text>
            <Text>{price}</Text>
            <Text>{description}</Text>
        </Flex>
    )
}