import React from "react";
import Head from "next/head";
import Page from "components/pages/breeds";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AccessDeniedIndicator from "components/access-denied-indicator";
import { getSession } from "next-auth/client";
import WithGraphQL from "lib/with-graphql";

const BreedsPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  session,
}) => {
  if (!session) {
    return <AccessDeniedIndicator />;
  }

  return (
    <WithGraphQL session={session}>
      <Head>
        <title>Breeds Page</title>
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

export default BreedsPage;
