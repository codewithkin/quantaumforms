'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeInSection({ children, className }: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
