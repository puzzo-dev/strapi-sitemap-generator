/**
 * Animation utilities for the I-VARSE website
 * Contains predefined animation variants and helpers for Framer Motion
 */

import { Variants } from 'framer-motion';

// Helper for staggered children animations
export const staggerChildren = (staggerTime = 0.1, delayFactor = 0): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1 * delayFactor,
      staggerChildren: staggerTime,
    },
  },
});

// Fade-in animation with optional Y direction
export const fadeInUp = (
  y = 20, 
  duration = 0.6, 
  delay = 0, 
  type = "spring"
): Variants => ({
  initial: { y, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      type,
      damping: 20,
    }
  },
  exit: {
    y: y / 2,
    opacity: 0,
    transition: {
      duration: duration * 0.75,
    }
  }
});

// Subtle scale animation for cards and containers
export const scaleUp = (
  scale = 0.97, 
  duration = 0.5, 
  delay = 0
): Variants => ({
  initial: { scale, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration,
      delay,
      type: "spring",
      damping: 15,
    }
  },
  exit: {
    scale,
    opacity: 0,
    transition: {
      duration: duration * 0.75,
    }
  }
});

// Slide-in animation from left or right
export const slideIn = (
  direction: 'left' | 'right', 
  duration = 0.7, 
  delay = 0
): Variants => {
  const x = direction === 'left' ? -60 : 60;
  
  return {
    initial: { x, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        type: "spring",
        damping: 20,
      }
    },
    exit: {
      x: x / 2,
      opacity: 0,
      transition: {
        duration: duration * 0.75,
      }
    }
  };
};

// Tech-inspired grid item animation
export const gridItemAnimation = (
  index: number, 
  staggerFactor = 0.05
): Variants => ({
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: index * staggerFactor,
      type: "spring",
      damping: 15,
    }
  },
  hover: {
    y: -7,
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 15,
    }
  }
});

// Snowfall-inspired particle animation
export const snowfallParticleAnimation = (delay = 0) => ({
  initial: { 
    y: -20, 
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    y: 0,
    opacity: [0, 1, 0.8, 1],
    scale: [0.8, 1, 0.95, 1],
    transition: {
      duration: 3,
      delay,
      repeat: Infinity,
      repeatType: "reverse" as const,
      type: "tween",
      ease: "easeInOut",
    }
  }
});

// Background shape/pattern animations
export const floatingShapeAnimation = (
  delayFactor = 0, 
  durationFactor = 1
) => ({
  initial: { 
    y: 0, 
    opacity: 0.6, 
    rotate: 0 
  },
  animate: {
    y: [0, -15, 0, 10, 0],
    opacity: [0.6, 0.8, 0.6, 0.7, 0.6],
    rotate: [0, 3, 0, -2, 0],
    transition: {
      duration: 8 * durationFactor,
      delay: delayFactor * 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
});

// Text character animation for headings
export const textCharAnimation = (delay = 0): Variants => ({
  initial: { 
    y: 20, 
    opacity: 0,
    transition: {
      type: "spring",
      damping: 12
    }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      delay
    }
  }
});

// Clip path reveal animation
export const clipPathReveal = (delay = 0, duration = 0.8): Variants => ({
  initial: { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", 
    opacity: 0.8 
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: "easeInOut"
    }
  }
});

// Glossy card with hover effects for product showcase
export const glossyCardAnimation: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 15,
      stiffness: 100
    } 
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};

// Cursor follower animation (for buttons)
export const buttonHoverAnimation = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 400
    }
  }
};

export const shimmerEffect = {
  initial: {
    backgroundPosition: "-500px 0",
  },
  animate: {
    backgroundPosition: ["500px 0"],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 2,
      ease: "linear"
    }
  }
};