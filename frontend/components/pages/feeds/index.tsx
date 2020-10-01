import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Stack, Skeleton, useColorMode } from "@chakra-ui/core";
import IFeed from "types/feed";
import Feed from "components/pages/feeds/feed";
import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";

const feedsSubscription = gql`
  subscription fetchFeeds {
    feeds(order_by: { created_at: desc }) {
      id
      created_at
      body
      author {
        id
        name
        image
        title
      }
    }
  }
`;

const FeedsPageComponent = () => {
  const [result] = useSubscription({
    query: feedsSubscription,
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
      <Box>
        <AddNewFeedForm />
      </Box>
      {result.data.feeds.map((feed: IFeed) => {
        return (
          <Box key={feed.id}>
            <Feed feed={feed} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default FeedsPageComponent;
