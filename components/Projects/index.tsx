import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    title: 'Waste Management',
    program: 'Mobile Apps',
    src: 'bwm.png',
    color: '#000000',
    company: 'Pemkot Bandung',
  },
  {
    title: 'Kopi Nobis',
    program: 'Brand Identity',
    src: 'kopi-nobis.png',
    color: '#8C8C8C',
    company: 'Kopi Nobis',
  },
  {
    title: 'Daily Monitoring',
    program: 'Website',
    src: 'diamond.png',
    color: '#EFE8D3',
    company: 'Telkom Indonesia Regional 3',
  },
  {
    title: 'Plasa Digital',
    program: 'Website & Mobile Apps',
    src: 'plasa-digital.jpg',
    color: '#706D63',
    company: 'Telkom Indonesia Regional 3',
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
};

const Home: React.FC = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  let xMoveContainer = useRef<any>(null);
  let yMoveContainer = useRef<any>(null);
  let xMoveCursor = useRef<any>(null);
  let yMoveCursor = useRef<any>(null);
  let xMoveCursorLabel = useRef<any>(null);
  let yMoveCursorLabel = useRef<any>(null);

  useEffect(() => {
    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', { duration: 0.8, ease: 'power3' });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', { duration: 0.8, ease: 'power3' });
    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, 'left', { duration: 0.5, ease: 'power3' });
    yMoveCursor.current = gsap.quickTo(cursor.current, 'top', { duration: 0.5, ease: 'power3' });
    // Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', { duration: 0.45, ease: 'power3' });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', { duration: 0.45, ease: 'power3' });
  }, []);

  const moveItems = (x: any, y: any) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active: any, index: any, x: any, y: any) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main onMouseMove={(e) => moveItems(e.clientX, e.clientY)} className={styles.projects}>
      <Rounded>
        <p>Highlight Project</p>
      </Rounded>
      <div className='pb-8' />
      <div className={styles.body}>
        {projects.map((project, index) => (
          <Project index={index} company={project.company} title={project.title} program={project.program} manageModal={manageModal} key={index} />
        ))}
      </div>
      <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'} className={styles.modalContainer}>
          <div style={{ top: index * -100 + '%' }} className={styles.modalSlider}>
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div className={styles.modal} style={{ backgroundColor: color }} key={`modal_${index}`}>
                  <Image src={`/images/${src}`} width={500} height={0} alt="image" />
                </div>
              );
            })}
          </div>
        </motion.div>
        {/* <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}>
          View
        </motion.div> */}
      </>
    </main>
  );
};

export default Home;
