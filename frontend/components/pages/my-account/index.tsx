import React, { useEffect, useState, FormEvent } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "urql";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  Heading,
  Button,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Text,
} from "@chakra-ui/core";
import Loader from "components/loader";
import { useSession } from "next-auth/client";

const usersQuery = gql`
  query fetchUser($userId: uuid!) {
    users_by_pk(id: $userId) {
      id
      name
      role
      title
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser(
    $userId: uuid!
    $name: String
    $role: String
    $title: String
  ) {
    update_users(
      where: { id: { _eq: $userId } }
      _set: { name: $name, role: $role, title: $title }
    ) {
      returning {
        id
        name
        role
      }
    }
  }
`;

const MyAccountPageComponent = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [session] = useSession();

  const [
    { data: fetchUserData, fetching: fetchUserFetching, error: fetchUserError },
  ] = useQuery({
    query: usersQuery,
    variables: {
      userId: session.id,
    },
  });

  useEffect(() => {
    if (fetchUserData) {
      const { name } = fetchUserData.users_by_pk;
      const { role } = fetchUserData.users_by_pk;
      const { title } = fetchUserData.users_by_pk;

      setName(name || "");
      setRole(role || "");
      setTitle(title || "");
    }
  }, [fetchUserData]);

  const [
    { fetching: updateUserFetching, error: updateUserError },
    updateUser,
  ] = useMutation(updateUserMutation);

  if (fetchUserFetching) {
    return <Loader />;
  }

  if (fetchUserError) {
    return <p>Error: {fetchUserError.message}</p>;
  }

  const handleSubmit = () => {
    updateUser({
      userId: session.id,
      name,
      role,
      title,
    });
  };

  const errorNode = () => {
    if (!updateUserError) {
      return false;
    }

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{updateUserError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Stack spacing={4}>
      <Heading color={color[colorMode]}>Moj Profil</Heading>
      {errorNode()}
      <Text>{session.user.name}</Text>
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <Box
          p={4}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          shadow="sm"
          rounded="lg"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                isDisabled={updateUserFetching}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Titula</FormLabel>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setTitle(e.currentTarget.value)
                }
                isDisabled={updateUserFetching}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Input
                type="text"
                id="role"
                value={role}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setRole(e.currentTarget.value)
                }
                isDisabled={updateUserFetching}
              />
            </FormControl>
            <FormControl>
              <Button
                loadingText="Saving..."
                onClick={handleSubmit}
                isLoading={updateUserFetching}
              >
                Save
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
};

export default MyAccountPageComponent;
