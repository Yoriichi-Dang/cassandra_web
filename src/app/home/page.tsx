'use client';

import { Post } from '@/components/home/post';
import ProductInfo from '@/components/home/product';
import ScrollSection from '@/components/home/scroll_section';

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-12">
      <ScrollSection>
        <ProductInfo />
      </ScrollSection>
      <ScrollSection>
        <Post />
      </ScrollSection>
    </div>
  );
}

export default Home;
