import React from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import HomePage from "../HomePage";

const HomePageView: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <HomePage />
      <motion.div className="progress-bar" style={{ scaleX }} />
    </>
  );
};

export default HomePageView;
