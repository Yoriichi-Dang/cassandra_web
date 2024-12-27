'use client';

type Props = {
  name: string;
  avatar: string;
  position: string;
};

import Image from 'next/image';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

export default function CardMember({ name, avatar, position }: Props) {
  return (
    <CardContainer className="inter-var w-full ">
      <CardBody className="bg-gray-50 relative flex flex-col items-center group/card  dark:hover:shadow-2xl dark:hover:shadow-white/[0.3] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        {/* <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem> */}
        <CardItem
          translateZ="120"
          rotateX={25}
          rotateZ={-5}
          className="w-full mt-4"
        >
          <Image
            src={avatar}
            height="200"
            width="200"
            className=" w-full h-80 object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex flex-col items-center mt-10 gap-4">
          <CardItem translateZ={'100'} rotateX={'10'}>
            <h1 className="text-2xl font-bold text-neutral-600 dark:text-white">
              {name}
            </h1>
          </CardItem>
          <CardItem translateZ={'100'}>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              {position}
            </p>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
