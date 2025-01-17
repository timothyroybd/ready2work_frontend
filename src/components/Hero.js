import React from 'react';
import heroBackground from "../asset/hero-illustration.svg"

import '../index.css';
//bg-gradient-to-b from-indigo-100 to-white
const Hero = () => {
  return (
    <main className="grow flex flex-col items-start justify-center ">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0  pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
          aria-hidden="true"
        >
         
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-14 pb-1 md:pt-8 md:pb-16">
            {/* Hero content */}
            <div className="max-w-3xl text-center md:text-left">
              {/* Copy */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl front-inter  pb-14">
                Find the perfect developer team,{' '}
                <span className="font-nycd text-indigo-600 font-normal">
                  faster
                </span>
              </h1>
             
              {/* Button + Avatars */}
              <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
                <div>
                  <a
                    className="btn text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm py-3 px-4 rounded-lg"
                    href="post-a-job.html"
                  >
                    Sign UP
                  </a>
                </div>

                <div>
                  <a
                    className="btn text-black bg-white-500 login_btn shadow-sm py-3 px-4 rounded-lg"
                    href="post-a-job.html"
                  >
                    Log In
                  </a>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>
  
    </main>
  );
};

export default Hero;
