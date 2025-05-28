import Image from 'next/image';
import { HeroText } from './HeroText';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full mt-6">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <HeroText />
      </div>

      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="relative h-140 w-full m-8">
          <Image src="/banner.png" alt="banner" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};
