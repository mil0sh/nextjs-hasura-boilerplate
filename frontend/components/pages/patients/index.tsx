import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Text, Stack, Skeleton, useColorMode } from "@chakra-ui/core";
// import IBreed from "types/breed";
import Patient from "components/pages/patients/patient";
// import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";
import { useRouter } from "next/router";

const patientSubscription = gql`
  subscription fetchPatient {
    patients {
      id
      name
      birthday
      gender {
        id
        name
      }
      dead
      breed {
        name
      }
      owner {
        id
        firstname
        lastname
        email
        jmbg
        note
        phones {
          id
          name
          number
        }
        address {
          street
          houseNumber
          entrance
          apartmentNumber
          district
          postalCode
          city
          country
          latitude
          longitude
        }
      }
    }
  }
`;

const PatientsPageComponent = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);

  const [result] = useSubscription({
    query: patientSubscription,
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
      {result.data.patients.map((patient) => {
        return (
          <Box key={patient.id}>
            <Patient patient={patient} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default PatientsPageComponent;
