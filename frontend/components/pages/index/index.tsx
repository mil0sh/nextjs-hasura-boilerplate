import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/core";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

const IndexPageComponent = () => {
  const [session] = useSession();
  const heightOfNavbar: string = "74px";
  const containerPadding: string = "1rem";
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "gray.100" };

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Napravi nalog
          </Button>
        </Link>
      </Box>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Odjava
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <Stack>
      <Flex
        minH={`calc(100vh - ${heightOfNavbar} - ${containerPadding}*2)`}
        justifyContent="center"
        alignItems="center"
        color={color[colorMode]}
      >
        <Stack spacing={4} maxW="xl" mx="auto">
          <Heading textAlign="center">Vet Planet App</Heading>
          <Text fontSize="xl" lineHeight="tall" textAlign="center">
            Kartoteka
          </Text>
          <Box>
            <Stack isInline align="center" justifyContent="center">
              {signInButtonNode()}
              {signOutButtonNode()}
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default IndexPageComponent;
