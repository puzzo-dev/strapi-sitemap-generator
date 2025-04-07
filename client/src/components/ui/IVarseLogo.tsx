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
        <div className="w-full relative">
          <img 
            src={whiteLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain filter drop-shadow-lg"
            style={{ filter: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.5))' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={whiteLogo} 
              alt="I-VARSE" 
              className="w-full h-full object-contain opacity-60"
              style={{ filter: 'blur(1px)' }}
            />
          </div>
        </div>
      ) : variant === 'dark' ? (
        <div className="w-full relative">
          <img 
            src={darkLogo} 
            alt="I-VARSE" 
            className="w-full h-full object-contain filter drop-shadow-lg"
            style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={darkLogo} 
              alt="I-VARSE" 
              className="w-full h-full object-contain opacity-60"
              style={{ filter: 'blur(1px)' }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full relative dark:hidden">
            <img 
              src={darkLogo} 
              alt="I-VARSE" 
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={darkLogo} 
                alt="I-VARSE" 
                className="w-full h-full object-contain opacity-60"
                style={{ filter: 'blur(1px)' }}
              />
            </div>
          </div>
          <div className="w-full relative hidden dark:block">
            <img 
              src={whiteLogo} 
              alt="I-VARSE" 
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ filter: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.5))' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={whiteLogo} 
                alt="I-VARSE" 
                className="w-full h-full object-contain opacity-60"
                style={{ filter: 'blur(1px)' }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IVarseLogo;
