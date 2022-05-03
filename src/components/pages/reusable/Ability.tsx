import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

type AbilityType = {
    image: unknown,
    name: string,
    stat: number
}

const Ability = ({image, name, stat}: AbilityType) => {
  return (
    <Flex
      width="100%"
      direction="row"
      justify="space-between"
      alignItems="center"
      mt="10px !important"
    >
      <Flex direction="row" alignItems="center">
        <Image src={String(image)} boxSize="30px" mr="20px" />
        <Text
          fontSize="16px"
          lineHeight="16px"
          fontWeight="300"
          color="#333333"
        >
          {name}
        </Text>
      </Flex>

      <Text fontSize="16px" lineHeight="16px" fontWeight="400" color="#333333">
        {String(stat)}
      </Text>
    </Flex>
  );
};

export default Ability;
