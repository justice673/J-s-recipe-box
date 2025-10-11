import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export default function ButtonLoader() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="inline-block"
    >
      <ChefHat className="w-4 h-4 text-current" />
    </motion.div>
  );
}
