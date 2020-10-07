import React from "react";
import {
  Box,
  Stack,
  Flex,
  Grid,
  Text,
  Image,
  useColorMode,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
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

const VakcineCard = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };
  return (
    <Box
      mb={6}
      p={3}
      alignContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Text as="b">Vakcinacije</Text>
      <br />
      <Text>-</Text>
    </Box>
  );
};

const OwnerCard = ({ owner }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };
  return (
    <Box
      p={3}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      shadow="lg"
      rounded="lg"
    >
      <Box as="p" mb={2}>
        <b>
          {owner.firstname} {owner.lastname}
        </b>
      </Box>
      <Box as="p" mb={2}>
        <a
          href={`https://www.google.com/maps?saddr=My+Location&daddr=${owner.address.latitude},${owner.address.longitude}`}
          target="_blank"
        >
          {owner.address.street} {owner.address.houseNumber}{" "}
          {owner.address.entrance && <span>/ {owner.address.entrance}</span>}
          {owner.address.apartmentNumber && (
            <span>/ {owner.address.apartmentNumber}</span>
          )}
          <br />
          {owner.address.postalCode} {owner.address.district}
          <br />
          {owner.address.city}, {owner.address.country}
        </a>
      </Box>
      <Box mb={2}>
        <Text as="b">Kontakt</Text>
        {owner.phones.map((phone) => {
          return (
            <Box key={phone.id}>
              {phone.name} <a href={`tel:{phone.number}`}>{phone.number}</a>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Text as="b">Napomena</Text>
        <br />
        {owner.note}
      </Box>
    </Box>
  );
};

const Patient = ({ patient }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  return (
    <Grid templateColumns="200px 1fr" gap={5}>
      <Box>
        <Box mb={6}>
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
            <Flex direction="column" align="center" py={3}>
              <Text fontSize="lg" as="b">
                {patient.name}
              </Text>
              <Text>{patient.birthday}</Text>
            </Flex>
          </Flex>
        </Box>
        <VakcineCard />
        <OwnerCard owner={patient.owner} />
      </Box>
      <Box>
        <Grid gap="5">
          <Flex justifyContent="space-between">
            <Text fontSize="3xl">Zdravstvena istorija</Text>
            <Menu>
              <MenuButton
                variantColor="blue"
                as={Button}
                rightIcon="chevron-down"
              >
                Dodaj
              </MenuButton>
              <MenuList>
                <MenuGroup title="Pregledi">
                  <MenuItem>Klinički</MenuItem>
                  <MenuItem>Dermatološki</MenuItem>
                  <MenuItem>Neurološki</MenuItem>
                  <MenuItem>Oftalmološki</MenuItem>
                  <MenuItem>Stomatološki</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem>Operacioni tok</MenuItem>
                <MenuDivider />
                <MenuItem>Vakcina</MenuItem>
                <MenuDivider />
                <MenuItem>Prethodni karton</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Patient;
