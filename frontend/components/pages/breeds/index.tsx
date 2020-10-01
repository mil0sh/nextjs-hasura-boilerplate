import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Stack, Skeleton, useColorMode } from "@chakra-ui/core";
import IBreed from "types/breed";
import Breed from "components/pages/breeds/breed";
// import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";

const breedsSubscription = gql`
  subscription fetchBreeds {
    breeds(order_by: { name: asc }) {
      id
      name
      original_name
      category
      official_id
    }
  }
`;

const BreedsPageComponent = () => {
  const [result] = useSubscription({
    query: breedsSubscription,
  });
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

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
      {result.data.breeds.map((breed: IBreed) => {
        return (
          <Box key={breed.id}>
            <Breed breed={breed} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default BreedsPageComponent;
