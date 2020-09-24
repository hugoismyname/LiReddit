import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();
  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
      </div>
    );
  }
  return (
    <Layout>
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Stack>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} shadow="md" borderLeftWidth="1px" padding={4}>
                <UpvoteSection post={p} />
                <Box flex={1} ml={8}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.creator.username}</Text>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <IconButton
                      icon="delete"
                      aria-label="Delete Post"
                      onClick={() => {
                        deletePost({
                          id: p.id,
                        });
                      }}
                    />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
