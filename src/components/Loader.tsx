import { ChefHat } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Loader() {
  const iconVariants: Variants = {
    initial: { scale: 1 },
    animate: {
      x: [0, 0, 0],
      y: [0, 0, 0],
      scale: [1, 0.8, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const topIconVariants: Variants = {
    initial: { x: 0, y: -40 },
    animate: {
      x: [0, 0, 0],
      y: [-40, 0, -40],
      scale: [1, 0.8, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const leftIconVariants: Variants = {
    initial: { x: -40, y: 0 },
    animate: {
      x: [-40, 0, -40],
      y: [0, 0, 0],
      scale: [1, 0.8, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rightIconVariants: Variants = {
    initial: { x: 40, y: 0 },
    animate: {
      x: [40, 0, 40],
      y: [0, 0, 0],
      scale: [1, 0.8, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Center Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <ChefHat className="w-8 h-8 text-green-600" />
          </motion.div>

          {/* Top Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={topIconVariants}
            initial="initial"
            animate="animate"
          >
            <ChefHat className="w-8 h-8 text-green-500" />
          </motion.div>

          {/* Left Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={leftIconVariants}
            initial="initial"
            animate="animate"
          >
            <ChefHat className="w-8 h-8 text-green-700" />
          </motion.div>

          {/* Right Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={rightIconVariants}
            initial="initial"
            animate="animate"
          >
            <ChefHat className="w-8 h-8 text-green-400" />
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg font-caveat"
        >
          Cooking up something delicious...
        </motion.p>
      </div>
    </div>
  );
}
