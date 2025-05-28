import React from 'react';
import { StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export const HeroText = () => {
  return (
    <section className="py-16 px-4 flex">
      <div className="max-w-3xl mx-auto text-left">
        <span className="inline-flex items-center bg-gradient-to-r from-[#90D53F] to-[#EEFC3F] text-[#1F2A1D] rounded-full px-4 py-2 text-sm font-bold mb-6">
          <StarIcon className="w-4 h-4 mr-2" />
          Making Property Management More Human
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#8ED53F] mb-4">
          Your AI Property Manager
        </h1>

        <p className="text-sm text-gray-200 mb-8">
          Automate admin, not relationships. Vinny handles your busywork so your team can spend more
          time with tenants and landlords.
        </p>

        <div className="flex flex-row items-center gap-4">
          <a
            href="#book-demo"
            className="inline-flex items-center bg-white text-[#1F2A1D] hover:bg-gray-100 font-medium rounded-full px-6 py-3"
          >
            Book a Demo
            <ArrowRightIcon className="w-5 h-5 ml-2 stroke-current text-[#1F2A1D]" />
          </a>
          <a href="#try-vinny" className="text-lime-400 hover:text-lime-300 font-medium underline">
            Or Try Vinny Now
          </a>
        </div>
      </div>
    </section>
  );
};
