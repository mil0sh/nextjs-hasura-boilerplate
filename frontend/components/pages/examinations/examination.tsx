import React, { FC } from "react";
import { Avatar, Box, Stack, Text, Badge, useColorMode } from "@chakra-ui/core";

import OldCard from "components/pages/examinations/old-card";
import dayjs from "dayjs";
import "dayjs/locale/sr";

// import IBreed from "types/breed";

// interface IProps {
//   breed: IBreed;
// }

const Examination = ({ examination }) => {
  dayjs.locale("sr");

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const borderColor = { light: "gray.300", dark: "gray.700" };

  const breedNode = () => {
    // const breedImage = `/examinations/${examination.official_id}.jpg`;
    return (
      <Stack
        spacing={4}
        p={4}
        borderBottomWidth={1}
        borderColor={borderColor[colorMode]}
      >
        <Stack>
          <Text as="b" fontSize="2xl">
            {examination.name}
          </Text>
          <Text>
            {dayjs(examination.created_at).format("dddd DD.MM.YYYY u HH:MM")}
          </Text>
          <Stack>
            <Avatar name={examination.patient.name} size="lg" />
          </Stack>
          <Box>
            Pacijent: {examination.patient.name}{" "}
            {examination.patient.dead && (
              <Badge variant="solid" variantColor="red">
                Preminuo {examination.patient.dead}
              </Badge>
            )}
          </Box>
          <Text>
            Vlasnik: {examination.patient.owner.firstname}{" "}
            {examination.patient.owner.lastname}
          </Text>
          <Text>Protocol: {examination.protocol}</Text>
          <Text>
            <b>Veterinar</b>
          </Text>
          <Stack isInline align="center">
            <Box>
              <Avatar src={examination.veterinarian.image} />
            </Box>
            <Box>
              <Text fontSize="lg" as="b">
                {examination.veterinarian.name}
              </Text>
              <Text>{examination.veterinarian.title}</Text>
            </Box>
          </Stack>
        </Stack>
        <Stack>
          <Text as="b" fontSize="lg">
            Pregled
          </Text>
          {examination.exam_fields.map((field) => {
            return (
              <Box key={field.id}>
                <Text fontWeight="bold">{field.description}</Text>
                <Text>{field.value}</Text>
              </Box>
            );
          })}
        </Stack>
        <Stack>
          <OldCard patient={examination.patient} />
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

export default Examination;
