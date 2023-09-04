import { Flex } from "@mantine/core";

export const ScreenTwo = () => {
  return (
    <Flex
      direction="column"
      style={{
        width: '100%',
        alignItems: 'center',
        height: '50vh',
        maxHeight: '50vh',
        overflow: 'auto',
      }}
    >
      <Flex
        direction="column"
        style={{
          width: '100%',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      ></Flex>
    </Flex>
  );
};