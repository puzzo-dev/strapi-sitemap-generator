import React from 'react';
import whiteLogo from '@assets/I-VARSELogo4@3x.png';
import darkLogo from '@assets/I-VARSELogo3@3x.png';

interface IVarseLogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'auto';
}

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
        />
      ) : variant === 'dark' ? (
        <img 
          src={darkLogo} 
          alt="I-VARSE" 
          className="w-full h-full object-contain"
        />
      ) : (
        <>
          <img 
            src={darkLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain dark:hidden"
          />
          <img 
            src={whiteLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain hidden dark:block"
          />
        </>
      )}
    </div>
  );
};

export default IVarseLogo;
