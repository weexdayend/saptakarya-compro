import React from 'react';
import styles from './style.module.scss';

const Index: React.FC = () => {
  return (
    <div className={styles.footer}>
      <a>Awwwards</a>
      <a>Instagram</a>
      <a>Dribble</a>
      <a>LinkedIn</a>
    </div>
  );
};

export default Index;
