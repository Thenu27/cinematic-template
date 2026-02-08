import './HeroSection.css';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HeroSection = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      desktopRef.current?.play();
      mobileRef.current?.play();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-section">
      <motion.div
        className="hero-text-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={itemVariants}>Where Creativity Falls</motion.h1>
        <motion.p variants={itemVariants}>
          Into motion, depth, and unforgettable digital experiences
        </motion.p>

        <motion.div className="hero-btn-container" variants={itemVariants}>
          <button className="hero-abt-btn">About</button>
          <button className="hero-contact-btn">Contact</button>
        </motion.div>
      </motion.div>

      {/* Desktop video */}
      <video
        ref={desktopRef}
        className="robot-vid desktop-vid"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src="/Robot.webm" type="video/webm" />
      </video>

      {/* Mobile video */}
      <div className='mobile-video-wrapper'>
      <video
        ref={mobileRef}
        className="robot-vid mobile-vid"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source src="/RobotSmall.webm" type="video/webm" />
      </video>
      </div>

    </div>
  );
};

export default HeroSection;
