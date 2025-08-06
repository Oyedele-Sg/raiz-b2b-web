"use client";
import { motion, MotionProps } from "motion/react";
import { ReactNode } from "react";

const defaultAnimationProps = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0 },
  // exit: { opacity: 0, x: "100%" },
  transition: {
    duration: 2,
    // type: "spring",
    stiffness: 80, // Softer spring effect
    damping: 25, // More bounce and slower settle
    easing: "ease-in-out",
  },
};

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedSection = ({
  children,
  className,
  ...props
}: AnimatedSectionProps) => {
  return (
    <motion.section
      {...defaultAnimationProps}
      {...props}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
