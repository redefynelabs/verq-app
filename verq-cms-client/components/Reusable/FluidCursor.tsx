'use client';
import { useEffect } from 'react';
import fluidCursor from '@/hooks/useFluidCursor'

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 z-2'>
      <canvas 
        id="fluid" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          background: 'transparent',
          zIndex: 9999,
        }}
      />
    </div>
  );
};
export default FluidCursor;
