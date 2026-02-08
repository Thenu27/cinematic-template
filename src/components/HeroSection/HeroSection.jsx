import './HeroSection.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HeroSection = () => {
  const [desktopReady, setDesktopReady] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  // Detect mobile/desktop
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Page fully loaded
  useEffect(() => {
    const onLoad = () => setPageReady(true);

    if (document.readyState === 'complete') {
      setPageReady(true);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // Only wait for the active video
  const activeVideoReady = isMobile ? mobileReady : desktopReady;
  const showHero = pageReady && activeVideoReady;

  // Play ONLY after everything is ready
  useEffect(() => {
    if (!showHero) return;
    const vid = isMobile ? mobileRef.current : desktopRef.current;
    vid?.play().catch(() => {});
  }, [showHero, isMobile]);

  return (
    <div className="hero-section">

      {/* Loader overlay */}
      {!showHero && <div className="hero-loader">Loading...</div>}

      {/* Text only when ready */}
      {showHero && (
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
      )}

      {/* Desktop video (no autoplay) */}
      <video
        ref={desktopRef}
        className="robot-vid desktop-vid"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={() => setDesktopReady(true)}

      >
        <source src="/Robot.webm" type="video/webm" />
      </video>

      {/* Mobile video (no autoplay) */}
      <div className="mobile-video-wrapper">
        <video
          ref={mobileRef}
          className="robot-vid mobile-vid"
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={() => setMobileReady(true)}

        >
          <source src="/RobotSmall.webm" type="video/webm" />
        </video>
      </div>

    </div>
  );
};

export default HeroSection;
