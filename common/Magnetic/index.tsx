import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface IndexProps {
  children: ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }: IndexProps): JSX.Element => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(children);
    const xTo = gsap.quickTo(magnetic.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(magnetic.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    if (magnetic.current) {
      magnetic.current.addEventListener('mousemove', handleMouseMove);
      magnetic.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      // Cleanup event listeners when the component unmounts
      if (magnetic.current) {
        magnetic.current.removeEventListener('mousemove', handleMouseMove);
        magnetic.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [children]);

  return React.cloneElement(children as React.ReactElement, { ref: magnetic });
};

export default Index;
