import React from "react";
import Button from "./Button";
import AnimatedGradientCircle from "./AnimatedGradientCircle";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="h-screen bg-[var(--purple-primary)] text-white py-32 pt-40 relative flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-pragmatica-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            AWJ International Media Production & Events Management & PR Company
          </motion.h1>

          <div className="absolute -top-48 -left-36 w-[500px] h-[500px] mx-auto my-12 flex items-center justify-center -z-10">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -left-96 inset-0 flex items-center justify-center">
                <AnimatedGradientCircle
                  delay={0.8}
                  duration={1.5}
                  staggerDelay={0.08}
                  size="100%"
                />
              </div>
            </div>
          </div>

          <motion.p
            className="text-lg md:text-xl mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Operating globally since 2012 delivering unforgettable experiences
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex justify-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button
              variant="primary"
              href="#about"
              withPlayButton
              size="lg"
              className="border-2 border-white"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
