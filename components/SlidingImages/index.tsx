import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

interface Project {
  color: string;
  src: string;
}

const slider1: Project[] = [
  { color: "#e3e5e7", src: "plasa-digital.jpg" },
  { color: "#d6d7dc", src: "bwm.png" },
  { color: "#e3e3e3", src: "kopi-nobis.png" },
  { color: "#21242b", src: "design.png" },
];

const slider2: Project[] = [
  { color: "#d4e3ec", src: "posthink.png" },
  { color: "#e5e0e1", src: "kopi-nobis-brand-identity.png" },
  { color: "#d7d4cf", src: "mudahkan.png" },
  { color: "#e1dad6", src: "roomtigadua-logo.png" },
];

const SlidingImages: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div key={index} className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
};

export default SlidingImages;
