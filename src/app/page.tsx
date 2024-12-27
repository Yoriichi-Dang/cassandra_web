'use client';
import { CardMemberPin } from '@/components/home/card-member-pin';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 1.5,
        ease: 'easeInOut',
      }}
      className="relative flex flex-col gap-4 items-center justify-center"
    >
      <div className="min-h-[700px] w-5/6 p-32">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Cassandra Team
        </h1>
        <p className="text-center mt-4 mb-24 text-lg text-gray-500">
          Sentiment Model AI Team, we are a group of passionate developers who
          are dedicated to building AI models and web applications.
        </p>
        <div className="w-full h-full grid grid-cols-3 gap-14">
          <div className="col-span-1">
            <CardMemberPin
              name="Dang Hoang Nguyen"
              avatar="/nguyen.jpg"
              position="Full Stack Developer"
              description="Crawl data Tiki, implement checkpoints model, and deploy the model to the server, build the front-end and back-end of the web application."
            />
          </div>
          <div className="col-span-1">
            <CardMemberPin
              name="Le Huu Minh Vu"
              avatar="/vu.jpg"
              position="AI Developer"
              description="Build model Electra, Proccess Data"
            />
          </div>
          <div className="col-span-1">
            <CardMemberPin
              name="Hoang Gia Tin"
              avatar="/tin.jpg"
              position="AI Developer"
              description="Crawl data Lazada, build model CNN BilSTM"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="p-[3px] mt-36 relative"
            onClick={() => router.push('/home')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-500 to-zinc-200 rounded-lg" />
            <div className="px-8 py-2 font-semibold  bg-black rounded-[6px]  relative group transition duration-500 text-white hover:text-black hover:bg-transparent">
              Go to feature
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
