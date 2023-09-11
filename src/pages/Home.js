import { Flex, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { AxiosService } from "../utils/AxiosService";
import video from "./../images/video.mp4";
import Navbar from "../components/navbar/NavBar";
import { CardBuy } from "../components/home/CardBuy";

export const Home = () => {
  const [nft, setNft] = useState([]);
  useEffect(() => {
    AxiosService("GET", "/nft")
      .then((response) => {
        console.log(response);
        setNft(response.nft);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex style={{  }} direction={"column"}>
      <Navbar />
      <Flex
        direction={"column"}
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex>
          <video data-keepplaying autoPlay loop playsInline muted>
            <source src={video} />
          </video>
        </Flex>
        <Flex
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            backgroundColor: "black",
            opacity: "40%",
          }}
        ></Flex>
        <Flex
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex direction={"column"}>
            <Text weight={"bold"} align="center" size={35} color="white">
              Explorez l'essence de la créativité musicale <br />
              Samples et échantillons d'exception pour sublimer votre musique
            </Text>
            <Text align="center" size={20} color="white">
              Plongez dans une collection unique de samples NFT et laissez votre
              créativité s'envoler.
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction={"column"}>
        <Title style={{ textAlign: "center", marginTop:'200px' }}>Le top 3 des ventes</Title>
        <Flex direction={"row"}>
          {nft && (
            nft
              .map((nf, index) => <CardBuy key={index} nft={nf} />)
              .splice(0, 3)
          )}
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        style={{
          width: "100vw",
          alignItems: "center",
        }}
      >
        <Flex
          style={{
            width: "100%",
            height: "150px",
          }}
        ></Flex>
        <Title>Les derniers ajouts</Title>
        {nft ? (
          nft
            .map((nf, index) => <CardBuy key={index} nft={nf} />)
            .reverse()
            .splice(0, 10)
        ) : (
          <>Vous ne possedez pas encore de nft</>
        )}
      </Flex>

      <Flex
        direction={"column"}
        style={{
          width: "100vw",
          alignItems: "center",
        }}
      >
        <Flex
          style={{
            width: "100%",
            height: "150px",
            backgroundColor:'black',
            marginTop:'100px',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Title color="white">Sublimez votre creativité !</Title>
        </Flex>

      </Flex>
    </Flex>
  );
};
