'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total animation duration control (extended for drama)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5s total duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#18181B]"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1], // Custom smooth bezier (similar to quartOut)
            },
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {/* Juno Logo SVG - White version, responsive sizing */}
              <svg
                viewBox="0 0 50 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[28px] w-[100px] text-white md:h-[40px] md:w-[140px]"
              >
                <motion.path
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  d="M3.92 0H6.88V2.93333H3.92V0ZM4 5.2H6.8V18.88C6.8 21.7067 5.76 24 2.90667 24C1.52 24 0.64 23.36 0 22.7467L1.01333 20.4267C1.44 20.96 1.84 21.3867 2.56 21.3867C3.94667 21.3867 4 19.8667 4 17.8933V5.2Z"
                  fill="currentColor"
                />
                <motion.path
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.8 }}
                  d="M20.6261 5.18652V18.4132H17.8261V15.0532C17.2395 17.3999 15.5595 18.8132 13.2661 18.8132C10.4395 18.8132 9.13281 16.5999 9.13281 13.3732V5.18652H11.9328V12.4132C11.9328 15.0532 12.7861 16.4399 14.7061 16.4399C16.4661 16.4399 17.6928 15.2665 17.8261 13.4265V5.18652H20.6261Z"
                  fill="currentColor"
                />
                <motion.path
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  d="M22.875 5.57285H25.675V8.98619C26.235 6.61285 27.915 5.17285 30.235 5.17285C33.0883 5.17285 34.3683 7.38618 34.3683 10.6129V18.8262H31.5683V11.5729C31.5683 8.95952 30.715 7.54619 28.795 7.54619C26.9817 7.54619 25.755 8.79952 25.675 10.7195V18.8262H22.875V5.57285Z"
                  fill="currentColor"
                />
                <motion.path
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                  d="M36.6172 12.0266C36.6172 7.86663 39.2572 4.95996 43.1772 4.95996C46.9905 4.95996 49.6039 7.78663 49.6039 12C49.6039 16.2133 46.9905 19.04 43.1505 19.04C39.3105 19.04 36.6172 16.2133 36.6172 12.0266ZM39.3639 12.0266C39.3639 14.72 40.9372 16.4533 43.1239 16.4533C45.3372 16.4533 46.8572 14.72 46.8572 12C46.8572 9.30663 45.3905 7.51996 43.1772 7.51996C40.9639 7.51996 39.3639 9.30663 39.3639 12.0266Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            {/* Elegant loading line - animating left to right */}
            <div className="mt-6 h-[1px] w-[100px] overflow-hidden bg-white/10 md:mt-8 md:w-[140px]">
              <motion.div
                className="h-full w-full bg-white/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: 1.0, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
