import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Text, Stack, Skeleton, useColorMode } from "@chakra-ui/core";
// import IBreed from "types/breed";
import Examination from "components/pages/examinations/examination";
// import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";

const examinationsSubscription = gql`
  subscription fetchExaminations {
    examinations {
      id
      protocol
      name
      created_at
      updated_at
      patient {
        id
        name
        dead
        date_of_death
        animalTypeByAnimalType {
          name
        }
        breed {
          official_id
          name
        }
        owner {
          firstname
          lastname
        }
      }
      veterinarian {
        name
        title
        image
      }
      exam_fields(order_by: { created_at: asc }) {
        id
        name
        description
        value
      }
      exam_uploads {
        id
        name
        url
      }
    }
  }
`;

const ExaminationsPageComponent = () => {
  const [result] = useSubscription({
    query: examinationsSubscription,
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
      {result.data.examinations.map((examination) => {
        return (
          <Box key={examination.id}>
            <Examination examination={examination} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default ExaminationsPageComponent;
