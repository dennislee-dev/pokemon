import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  VStack,
  Flex,
  Spacer,
  HStack,
  Input,
} from "@chakra-ui/react";
import {
  Previous,
  Paginator,
  PageGroup,
  Next,
  usePaginator,
} from "chakra-paginator";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import bgImage from "../../../assets/image/login-bg.png";
import topImage from "../../../assets/image/top-img.png";
import searchIcon from "../../../assets/image/search.svg";
import CardList from "../reusable/CardList";

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [pagesQuantity, setPagesQuantity] = useState(undefined);

  const outerLimit = 1;
  const innerLimit = 1;

  const { currentPage, setCurrentPage, pageSize } = usePaginator({
    initialState: {
      pageSize: 12,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // styles
  const baseStyles = {
    width: "56px",
    height: "56px",
    borderRadius: "8px",
    fontSize: "18px",
    lineHeight: "21px",
  };

  const normalStyles = {
    ...baseStyles,
    _hover: {
      backgroundColor: "white",
    },
    backgroundColor: "white",
  };

  const activeStyles = {
    ...baseStyles,
    _hover: {
      backgroundColor: "#0043C0",
    },
    backgroundColor: "#0043C0",
    color: "white",
  };

  const separatorStyles = {
    ...baseStyles,
    backgroundColor: "white",
  };

  async function getAllPokemons() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1118"
      );
      setItems(response.data.results);
      setSearchResult(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    if (searchResult.length) {
      const pagesTotal = (searchResult.length - pageSize) > 12 ? Math.ceil(searchResult.length / pageSize - 1) : 1;
      setPagesQuantity(pagesTotal);
    }
  }, [searchResult.length, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
    if (search === "") {
      setSearchResult(items);
    } else {
      setSearchResult(items.filter((item) => item.name.includes(search)));
    }
  }, [search, items, setCurrentPage]);

  return (
    <Box
      backgroundImage={bgImage}
      w="100%"
      minH="1213px"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <VStack>
        <Image
          src={topImage}
          width={{ base: "360px", md: "470px" }}
          height={{ base: "185px", md: "230px" }}
          mt="20px"
        />
        <HStack
          width={{ base: "70%", lg: "730px" }}
          h="60px"
          border="2px #0043C0 solid"
          borderRadius="17px"
          bg="white"
          mt="17px !important"
          p="20px"
        >
          <Image src={searchIcon} boxSize="23px" />
          <Input
            variant="unstyled"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </HStack>
        <CardList
          items={searchResult}
          curPage={currentPage}
          itemLimit={pageSize}
        />
        <Flex my="48px !important">
          <Spacer />
          <Paginator
            activeStyles={activeStyles}
            innerLimit={innerLimit}
            currentPage={currentPage}
            outerLimit={outerLimit}
            normalStyles={normalStyles}
            separatorStyles={separatorStyles}
            pagesQuantity={pagesQuantity}
            onPageChange={handlePageChange}
          >
            <Previous w="56px" h="56px" bg="#0043C0" mr="16px" color="white">
              <ArrowLeftIcon />
            </Previous>
            <PageGroup isInline align="center" />
            <Next w="56px" h="56px" bg="#0043C0" ml="16px" color="white">
              <ArrowRightIcon />
            </Next>
          </Paginator>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DashboardPage;
