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

export default function HeroSection() {
  const [pageReady, setPageReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const desktopRef = useRef(null);

  // 1) Wait for the whole page (images/css/fonts/etc.)
  useEffect(() => {
    const onLoad = () => setPageReady(true);

    if (document.readyState === 'complete') {
      setPageReady(true);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // 2) When both are ready -> play video
  useEffect(() => {
    if (!pageReady || !videoReady) return;
    desktopRef.current?.play().catch(() => {});
  }, [pageReady, videoReady]);

  const showHero = pageReady && videoReady;

  return (
    <div className="hero-section">

      {/* Loader while waiting */}
      {!showHero && <div className="hero-loader">Loading...</div>}

      {/* Text only after EVERYTHING is ready */}
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

      {/* Video is rendered but NOT autoplaying until we allow it */}
      <video
        ref={desktopRef}
        className="robot-vid desktop-vid"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onCanPlayThrough={() => setVideoReady(true)}
      >
        <source src="/Robot.webm" type="video/webm" />
      </video>

    </div>
  );
}
