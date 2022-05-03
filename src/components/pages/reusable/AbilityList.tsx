import React from "react";
import { VStack } from "@chakra-ui/react";
import Ability from "./Ability";
import attackImg from "../../../assets/image/attack.svg";
import defenseImg from "../../../assets/image/defense.svg";
import hpImg from "../../../assets/image/hp.svg";
import speedImg from "../../../assets/image/speed.svg";
import specialDefenseImg from "../../../assets/image/special-defense.svg";
import specialAttackImg from "../../../assets/image/special-attack.svg";

interface Stat {
  name: string,
  url: string
}
interface EachAbility {
  base_stat: number,
  effort: number,
  stat: Stat
}

type AbilityType = {
  ability: Array<EachAbility>;
};

const AbilityList = ({ ability }: AbilityType) => {

  const images = [
    hpImg,
    attackImg,
    defenseImg,
    specialAttackImg,
    specialDefenseImg,
    speedImg
  ];

  return (
    <VStack width="100%">
      {images.map((image: unknown, index: number) => {
        return (
          <Ability
            key={index}
            image={image}
            name={ability[index].stat.name}
            stat={ability[index].base_stat}
          />
        );
      })}
    </VStack>
  );
};

export default AbilityList;
