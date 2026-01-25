'use client';
import { motion } from 'motion/react';
type Props = {
  children: React.ReactNode;
};
const AnimatedWraper = ({ children }: Props) => {
  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-bg-card border-b border-line p-2 backdrop-blur-md "
    >
      {children}
    </motion.header>
  );
};
export default AnimatedWraper;
