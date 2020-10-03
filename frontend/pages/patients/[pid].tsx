import React from "react";
import Head from "next/head";
import Page from "components/pages/patients";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AccessDeniedIndicator from "components/access-denied-indicator";
import { getSession } from "next-auth/client";
import WithGraphQL from "lib/with-graphql";
import { useRouter } from "next/router";

const PatientPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  session,
}) => {
  if (!session) {
    return <AccessDeniedIndicator />;
  }

  const router = useRouter();
  const { pid } = router.query;

  return (
    <WithGraphQL session={session}>
      <Head>
        <title>Stranica pacijenta</title>
      </Head>
      <Page />
    </WithGraphQL>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default PatientPage;
