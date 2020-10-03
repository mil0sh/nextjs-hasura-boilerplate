import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Text, Stack, Skeleton, useColorMode } from "@chakra-ui/core";
import IBreed from "types/breed";
import Owner from "components/pages/owners/owner";
// import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";

const ownersSubscription = gql`
  subscription Owners {
    owners {
      id
      lastname
      firstname
      email
      address {
        street
      }
    }
  }
`;

const OwnersPageComponent = () => {
  const [result] = useSubscription({ query: ownersSubscription });
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  const { data, fetching, error } = result;

  // if (fetching) {
  //   return (
  //     <Box
  //       bg={bgColor[colorMode]}
  //       color={color[colorMode]}
  //       shadow="lg"
  //       rounded="lg"
  //       p="4"
  //     >
  //       <Skeleton height="20px" my="10px" />
  //       <Skeleton height="20px" my="10px" />
  //       <Skeleton height="20px" my="10px" />
  //     </Box>
  //   );
  // }

  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;

  if (!result.data) {
    return (
      <Box
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        shadow="lg"
        rounded="lg"
        p="4"
      >
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </Box>
    );
  }

  return (
    <Stack spacing={8}>
      {result.data.owners.map((owner) => {
        return (
          <Box key={owner.id}>
            <Owner owner={owner} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default OwnersPageComponent;
