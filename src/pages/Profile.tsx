import { Button, Flex } from "@mantine/core";
import { Sidebar } from "../components/profile/SideBar";
import { useState, useEffect } from "react";
import { ScreenOne } from "../components/profile/ScreenOne";
import { ScreenTwo } from "../components/profile/ScreenTwo";
import Navbar from "../components/navbar/NavBar";
import { AxiosService } from "../utils/AxiosService";
import { setCookie } from "../utils/Cookies";

export const Profile = () => {
  const initialScreen = parseInt(localStorage.getItem("screen") || "0", 10);
  const [screen, setScreen] = useState(initialScreen);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 900);
  const [nft, setNft] = useState<any[]>([])

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
        height: "95vh",
				paddingTop:'51px'
      }}
    >
      <button onClick={(()=>{Login("test","1234567890")})}>Login</button>
			<Navbar />
      {showSidebar && <Sidebar />}
      <Flex
        direction="column"
        style={{
					width: "100%",
          height: "100%",
        }}
      >
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
        {screen === 0 ? <ScreenOne nft={nft}  /> : <ScreenTwo />}
      </Flex>
    </Flex>
  );
};
