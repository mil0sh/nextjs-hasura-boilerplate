import React, { FC } from "react";
import { Box, Stack, Text, Avatar, useColorMode } from "@chakra-ui/core";
import IBreed from "types/breed";

interface IProps {
  breed: IBreed;
}

const Breed: FC<IProps> = ({ breed }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  const breedNode = () => {
    const breedImage = `/breeds/${breed.official_id}.jpg`;
    return (
      <Stack
        spacing={4}
        isInline
        alignItems="center"
        p={4}
        borderBottomWidth={1}
        borderColor={borderColor[colorMode]}
      >
        <Stack>
          <Text fontWeight="bold">{breed.name}</Text>
          <Text>{breed.original_name}</Text>
          <Text>{breed.category}</Text>
        </Stack>
      </Stack>
    );
  };
  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Stack spacing={0}>{breedNode()}</Stack>
    </Box>
  );
};

export default Breed;
