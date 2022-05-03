import React, { useState } from "react";
import {
  Box,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import bgImage from "../../../assets/image/login-bg.png";

const FullnamePage = () => {
  const [name, setInput] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const isNameError = name === "";

  const mtCss = css({
    marginTop: "27px",
  });

  const handleNextClick = () => {
    localStorage.setItem("name", JSON.stringify(name));
    window.location.href = "/birth-date";
  };

  return (
    <Box backgroundImage={bgImage} w="100vw" h="100vh" backgroundSize="cover" backgroundPosition="center">
      <Center w="100%" h="100%">
        <Container
          bg="white"
          borderRadius="xl"
          width={{base:"360px", md:"50%"}}
          h="200px"
          boxShadow="dark-lg"
          centerContent
          style={{ justifyContent: "center" }}
        >
          <Container>
            <FormControl isInvalid={isNameError}>
              <FormLabel htmlFor="fullname">Full Name :</FormLabel>
              <Input
                id="fullname"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              {isNameError && (
                <FormErrorMessage>Full Name is required.</FormErrorMessage>
              )}
              <Center>
                <Button
                  colorScheme="teal"
                  size="md"
                  alignSelf="center"
                  css={!isNameError && mtCss}
                  disabled={!name}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </Center>
            </FormControl>
          </Container>
        </Container>
      </Center>
    </Box>
  );
};

export default FullnamePage;
