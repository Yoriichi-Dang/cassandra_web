import React from 'react';
import { PinContainer } from '../ui/3d-pin';
import Image from 'next/image';
type Props = {
  name: string;
  avatar: string;
  position: string;
  description: string;
};
export function CardMemberPin({ name, avatar, position, description }: Props) {
  return (
    <div className="h-full min-w-full flex items-center justify-center ">
      <PinContainer title={description}>
        <div className="flex  basis-full flex-col items-center p-4 gap-2 tracking-tight text-slate-100/50 h-full w-80">
          <Image
            src={avatar}
            height="200"
            width="200"
            className=" w-full h-80 object-cover rounded-xl group-hover/card:shadow-xl mb-6"
            alt="thumbnail"
          />
          <h1 className="text-2xl font-bold text-neutral-600 dark:text-white">
            {name}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            {position}
          </p>
        </div>
      </PinContainer>
    </div>
  );
}
