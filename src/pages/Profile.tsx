import { Button, Flex } from "@mantine/core";
import { Sidebar } from "../components/profile/SideBar";
import { useState, useEffect } from "react";
import { ScreenOne } from "../components/profile/ScreenOne";
import { ScreenTwo } from "../components/profile/ScreenTwo";
import Navbar from "../components/navbar/NavBar";
import { AxiosService } from "../utils/AxiosService";
import { setCookie } from "../utils/Cookies";
import { Sample } from "../Interface/Sample";

export const Profile = () => {
  const initialScreen = parseInt(localStorage.getItem("screen") || "0", 10);
  const [screen, setScreen] = useState(initialScreen);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 900);
  const [nft, setNft] = useState<Sample[]>([])

  const handleButtonOnePress = () => {
    setScreen(0);
  };

  const handleButtonTwoPress = () => {
    setScreen(1);
  };

  useEffect(() => {
    AxiosService("GET","/nft?owner=1")
    .then((response) => {
      setNft(response.nft)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  const Login= async(username:string,password:string)=>{
    //@ts-ignore
    AxiosService("POST","/auth/login", {username, password})
    .then((res)=>{
      setCookie("token",res.token,"/")
    }).catch((err)=>{
      // TODO: redirect to login page
      console.log(err)
    })
  }

  useEffect(() => {
    localStorage.setItem("screen", screen.toString());
  }, [screen]);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex
			direction={'row'}
      style={{
        width: "100vw",
        height: "92vh",
				paddingTop:'51px'
      }}
    >
			<Navbar />
      {showSidebar && <Sidebar />}
      <Flex
        direction="column"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Button style={{
          width:"100px",
          height:"30px",
          alignSelf:'center'
        }} onClick={(()=>{Login("test","1234567890")})}>Login</Button>
        <Flex
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <Button
            onClick={handleButtonOnePress}
            style={{
              width: "200px",
            }}
            variant={screen === 0 ? "filled" : "outline"}
            color="dark"
            uppercase
          >
            Mes NFT
          </Button>
          <Button
            onClick={handleButtonTwoPress}
            style={{
              width: "200px",
            }}
            variant={screen === 1 ? "filled" : "outline"}
            color="dark"
            uppercase
          >
            Mes achats
          </Button>
        </Flex>
        {screen === 0 ? <ScreenOne nft={nft} setNft={setNft}  /> : <ScreenTwo />}
      </Flex>
    </Flex>
  );
};
