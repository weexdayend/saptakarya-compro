'use client';

import React from 'react';
import styles from './style.module.scss';

interface ProjectProps {
  index: number;
  title: string;
  program: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

const Project: React.FC<ProjectProps> = ({ index, title, program, manageModal }) => {
  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <div>
        <h4>{program}</h4>
        <h2>{title}</h2>
      </div>
      <p>Design & Development</p>
    </div>
  );
};

export default Project;
