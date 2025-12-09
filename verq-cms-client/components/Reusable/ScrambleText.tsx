"use client";

import React from 'react';
import { useScrambleText } from '@/hooks/useScrambleText';

interface ScrambleTextProps {
  text: string;
  as?: 'span' | 'div' | 'button' | 'a' | 'p' | 'h1' | 'h2' | 'h3';
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

const ScrambleText = ({ 
  text, 
  as: Component = 'span', 
  className = '', 
  href,
  onClick,
  children 
}: ScrambleTextProps) => {
  const { elementRef, startScramble, resetScramble } = useScrambleText(text);

  const props = {
    ref: elementRef as any,
    className,
    onMouseEnter: startScramble,
    onMouseLeave: resetScramble,
    ...(href && { href }),
    ...(onClick && { onClick }),
  };

  return React.createElement(
    Component,
    props,
    children || text
  );
};

export default ScrambleText;
