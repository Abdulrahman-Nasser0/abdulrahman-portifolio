'use client';

import { useRef } from 'react';

import { motion } from 'framer-motion';

import { MagneticButton } from '@/components';
import { useOffcanvasToggle } from '@/hooks';
import { cn } from '@/utils';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {import('react').Dispatch<SetStateAction<boolean>>} props.handleOpen
 */
export function OffcanvasToggle({ isOpen, handleOpen }) {
  /** @type {import('react').MutableRefObject<HTMLDivElement>} */
  const containerRef = useRef(null);
  const { scrollYProgress } = useOffcanvasToggle({
    element: containerRef,
    callback: latest => latest <= 1 && handleOpen(false),
  });

  return (
    <motion.div
      ref={containerRef}
      className='fixed right-0 top-0 z-40 m-6'
      initial={false}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ scale: scrollYProgress }}
    >
      <MagneticButton
        size='md'
        variant='ghost'
        className='border border-solid border-muted-foreground'
        onClick={() => handleOpen(!isOpen)}
      >
        <span className='relative inline-block h-4 w-8'>
          <span
            className={cn(
              'absolute left-0 top-0 block h-[2px] w-full bg-background transition-transform duration-300 ease-in-expo',
              isOpen && 'top-1/2 -translate-y-1/2 -rotate-45',
            )}
          />
          <span
            className={cn(
              'absolute bottom-0 left-0 block h-[2px] w-full bg-background transition-transform duration-300 ease-in-expo',
              isOpen && 'bottom-1/2 translate-y-1/2 rotate-45',
            )}
          />
        </span>
        <span className='sr-only focus:not-sr-only'>Offcanvas Toggle</span>
      </MagneticButton>
    </motion.div>
  );
}
