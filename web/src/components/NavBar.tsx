import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let navLinks = null;

  //data is loading
  if (fetching) {
    navLinks = null;
    //user not logged in
  } else if (!data?.me) {
    navLinks = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>register</Link>
        </NextLink>
      </>
    );
    // user logged in
  } else {
    navLinks = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{navLinks}</Box>
    </Flex>
  );
};
