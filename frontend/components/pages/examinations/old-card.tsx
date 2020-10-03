import { Box, Text, Button, Link } from "@chakra-ui/core";

const OldCard = ({ patient }) => {
  return (
    <>
      <Link
        href={`/records/${patient.old_record}/${patient.protocol}-${patient.name}.pdf`}
        target="_blank"
      >
        <Button>Stari karton {patient.name}</Button>
      </Link>
    </>
  );
};

export default OldCard;
