import React, { FC } from "react";
import { Box, Stack, Text, Avatar, useColorMode } from "@chakra-ui/core";
import IBreed from "types/breed";

interface IProps {
  breed: IBreed;
}

const Owner: FC<IProps> = ({ owner }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Stack
        spacing={4}
        p={4}
        borderBottomWidth={1}
        borderColor={borderColor[colorMode]}
      >
        <Box p={0} mb={0}>
          <b>
            {owner.firstname} {owner.lastname}
          </b>
        </Box>
        <Text>{owner.email}</Text>
      </Stack>
    </Box>
  );
};

export default Owner;
