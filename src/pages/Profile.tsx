import { Button, Flex } from "@mantine/core";
import { Sidebar } from "../components/profile/SideBar";
import { useState, useEffect } from "react";
import { ScreenOne, ScreenTwo } from "../components/profile/Screen";
import Navbar from "../components/navbar/NavBar";

export const Profile = () => {
  const initialScreen = parseInt(localStorage.getItem("screen") || "0", 10);
  const [screen, setScreen] = useState(initialScreen);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 900);

  const handleButtonOnePress = () => {
    setScreen(0);
  };

  const handleButtonTwoPress = () => {
    setScreen(1);
  };

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
        {screen === 0 ? <ScreenOne /> : <ScreenTwo />}
      </Flex>
    </Flex>
  );
};
