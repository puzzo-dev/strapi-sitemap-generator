import React from 'react';

interface IVarseLogoProps {
  className?: string;
  size?: number;
}

const IVarseLogo: React.FC<IVarseLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 gradient-bg rounded-full"></div>
      <div className="absolute inset-[12%] dark:bg-secondary-dark bg-white rounded-full flex items-center justify-center">
        <div className="absolute w-[20%] h-[20%] gradient-bg rounded-full top-[35%] left-[45%]"></div>
        <div className="absolute w-[40%] h-[20%] gradient-bg rounded-full top-[55%] left-[35%]"></div>
      </div>
    </div>
  );
};

export default IVarseLogo;
