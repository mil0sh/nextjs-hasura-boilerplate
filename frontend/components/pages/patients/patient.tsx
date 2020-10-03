import React from "react";
import {
  Box,
  Stack,
  Flex,
  Grid,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/core";
import dayjs from "dayjs";
import "dayjs/locale/sr";

const Pregled = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };
  return (
    <Box
      p={4}
      alignContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Text>Pregled</Text>
    </Box>
  );
};

const Patient = ({ patient }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  return (
    <Grid templateColumns="200px 1fr" gap={3}>
      <Stack>
        <Box>
          <Flex
            direction="column"
            align="center"
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            shadow="lg"
            rounded="lg"
            borderColor={borderColor}
          >
            <Image
              roundedTop="lg"
              src={`/patients/${patient.id}/${patient.name}.jpg`}
              size="100"
              objectFit="cover"
              alt={patient.name}
            />
            <Text fontSize="lg" as="b">
              {patient.name}
            </Text>
            <Text>{patient.birthday}</Text>
          </Flex>
        </Box>
        <Box
          p={3}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          shadow="lg"
          rounded="lg"
        >
          <Text as="b">
            {patient.owner.firstname} {patient.owner.lastname}
          </Text>
          <Text></Text>
        </Box>
      </Stack>
      <Box>
        <Grid gap="5">
          <Pregled />
          <Pregled />
          <Pregled />
          <Pregled />
          <Pregled />
        </Grid>
      </Box>
    </Grid>
  );
};

export default Patient;
