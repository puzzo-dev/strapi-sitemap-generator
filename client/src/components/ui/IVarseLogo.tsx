import React from 'react';
import whiteLogo from '@/assets/V2.png'; // White logo for dark theme
import darkLogo from '@/assets/V1.png'; 
// Blue/dark logo for light theme
import { IVarseLogoProps } from '@/lib/types';


const IVarseLogo: React.FC<IVarseLogoProps> = ({ 
  className = '', 
  size = 40,
  variant = 'auto'
}) => {
  return (
    <div 
      className={`relative ${className} overflow-hidden flex items-center`} 
      style={{ height: size, minWidth: size * 3.5 }}
    >
      {variant === 'light' ? (
        <img 
          src={whiteLogo} 
          alt="I-VARSE" 
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        />
      ) : variant === 'dark' ? (
        <img 
          src={darkLogo} 
          alt="I-VARSE" 
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        />
      ) : (
        <>
          <img 
            src={darkLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain dark:hidden"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
          />
          <img 
            src={whiteLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain hidden dark:block"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
          />
        </>
      )}
    </div>
  );
};

export default IVarseLogo;
