import { motion } from "framer-motion";

const AnimatedImage = () => {
  return (
    <motion.img
      src="/images/image4.jpg"
      alt="Animated"
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      style={{ width: "400px", height: "auto", margin: "0 auto", display: "block" }} // Adjust width
    />
  );
};

export default AnimatedImage;