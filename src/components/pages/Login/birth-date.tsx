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

const BirthdatePage = () => {
  const [birthday, setBirthday] = useState("");
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value);
  const isBirthdayError = birthday === "";

  const mtCss = css({
    marginTop: "27px",
  });

  const handleCompleteClick = () => {
    localStorage.setItem("birthday", JSON.stringify(birthday));
    window.location.href = "/dashboard";
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
            <FormControl isInvalid={isBirthdayError}>
              <FormLabel htmlFor="birthday">Birth Date :</FormLabel>
              <Input
                id="birthday"
                type="date"
                value={birthday}
                onChange={handleBirthdayChange}
              />
              {isBirthdayError && (
                <FormErrorMessage>Birthday is required.</FormErrorMessage>
              )}
              <Center>
                <Button
                  colorScheme="teal"
                  size="md"
                  alignSelf="center"
                  css={!isBirthdayError && mtCss}
                  disabled={!birthday}
                  onClick={handleCompleteClick}
                >
                  Complete
                </Button>
              </Center>
            </FormControl>
          </Container>
        </Container>
      </Center>
    </Box>
  );
};

export default BirthdatePage;
