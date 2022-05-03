import React, { useEffect, useState } from "react";
import {
  VStack,
  Image,
  Text,
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import AbilityList from "./AbilityList";
import modalGroupImg from "../../../assets/image/modal-group.png";

type CardType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
};

const Card = ({ item }: CardType) => {
  const [pokemonImg, setPokemonImg] = useState(null);
  const [ability, setAbility] = useState([]);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getPokemonInfo(abilityUrl: string) {
    try {
      const pokemonNum =
        abilityUrl.split("/")[abilityUrl.split("/").length - 2];
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonNum.toString()
      );
      setPokemonImg(response.data.sprites.front_default);
      setAbility(response.data.stats);
      setHeight(response.data.height);
      setWeight(response.data.weight);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPokemonInfo(item.url);
  }, [item]);

  return (
    <>
      <Box w="170px" h="222px" onClick={onOpen}>
        <Center>
          <VStack
            w="160px"
            h="210px"
            bg="white"
            borderRadius="17px"
            pt="9px"
            pb="23px"
            px="8px"
            boxShadow="blue 0px 0px 0px 0px inset, rgb(255 255 255) -17px -17px 17px -17px, rgb(0 145 229) 5px 5px"
            _hover={{ w: "170px", h: "222px" }}
            transition="all ease .3s"
          >
            <Image src={String(pokemonImg)} boxSize="100%" />
            <Text
              as="i"
              color="#1F0079"
              fontSize="16px"
              lineHeight="16px"
              fontWeight="bold"
              mt="18px"
            >
              {item.name}
            </Text>
          </VStack>
        </Center>
      </Box>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="300px" height="832px" borderRadius="17px">
          <ModalCloseButton />
          <ModalBody>
            <VStack>
                <Image src={String(pokemonImg)} boxSize="144px" />
                <Text as="i" fontSize="24px" lineHeight="16px" color="#1F0079" mt="18px !important" mb="28px !important">{item.name}</Text>
                <AbilityList ability={ability} />
                <VStack width="244px" height="97px" borderRadius="14px" backgroundColor="#E6F8FF" pt="22px" px="23px" mt="23px !important">
                    <Flex width="100%" direction="row" justify="space-between" alignItems="center" mb="13px !important">
                        <Text fontSize="16px" lineHeight="16px" fontWeight="300" color="#333333">HEIGHT</Text>
                        <Text fontSize="16px" lineHeight="16px" fontWeight="400" color="#333333">{height}</Text>
                    </Flex>
                    <Flex width="100%" direction="row" justify="space-between" alignItems="center">
                        <Text fontSize="16px" lineHeight="16px" fontWeight="300" color="#333333">WEIGHT</Text>
                        <Text fontSize="16px" lineHeight="16px" fontWeight="400" color="#333333">{weight}</Text>
                    </Flex>
                </VStack>
                <Box width="244px" height="128px" mt="14px !important">
                    <Image src={modalGroupImg} boxSize="100%" />
                </Box>
                <Button w="243px" h="60px" bg="#0043C0" borderRadius="23px" color="white" mt="23px !important" onClick={onClose}>Close</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
