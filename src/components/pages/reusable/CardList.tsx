/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../reusable/Pokedex";

type CardListType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;
  curPage: Number;
  itemLimit: Number;
};

const CardList = ({ items, curPage, itemLimit }: CardListType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [curItems, setCurItems] = useState<any[]>([]);

  useEffect(() => {
    const offset = Number(curPage) * Number(itemLimit);
    const getList = (itemLimit: Number) => {
      setCurItems(items.slice(offset, Number(offset) + Number(itemLimit)));
    };

    getList(itemLimit);
  }, [curPage, itemLimit, items]);

  return (
    <Flex
      direction="row"
      width={{lg: "742px", xl: "1130px"}}
      wrap="wrap"
      justify="flex-start"
      mt="28px !important"
      gap="20px"
    >
      {curItems.map((item: unknown, index: number) => {
        return <Card key={index} item={item} />;
      })}
    </Flex>
  );
};

export default CardList;
