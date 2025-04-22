import React from 'react';

interface ThreeDStepIconProps {
  step: number;
  color?: string;
}

/**
 * A 2D version of the step icon that doesn't rely on Three.js
 * This avoids compatibility issues between Three.js versions
 */
const ThreeDStepIcon: React.FC<ThreeDStepIconProps> = ({ step, color }) => {
  // Define colors for each step
  const getStepColor = () => {
    if (color) return color;
    
    switch (step) {
      case 1: return '#ff4d4d'; // Red for form
      case 2: return '#4da6ff'; // Blue for template
      case 3: return '#4dff88'; // Green for document
      default: return '#888888';
    }
  };

  // Define icons for each step
  const getStepIcon = () => {
    switch (step) {
      case 1:
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <rect x="3" y="3" width="18" height="18" rx="2" fill={getStepColor()} />
            <line x1="7" y1="9" x2="17" y2="9" stroke="white" strokeWidth="2" />
            <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="2" />
            <line x1="7" y1="15" x2="13" y2="15" stroke="white" strokeWidth="2" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <rect x="3" y="3" width="18" height="18" rx="2" fill={getStepColor()} />
            <rect x="6" y="6" width="6" height="4" fill="white" />
            <rect x="6" y="11" width="12" height="2" fill="white" opacity="0.7" />
            <rect x="6" y="14" width="12" height="2" fill="white" opacity="0.7" />
            <rect x="6" y="17" width="8" height="2" fill="white" opacity="0.7" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="white" />
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke={getStepColor()} strokeWidth="2" />
            <path d="M17 7H7V9H17V7Z" fill={getStepColor()} />
            <path d="M7 11H17V12H7V11Z" fill="#dddddd" />
            <path d="M7 14H17V15H7V14Z" fill="#dddddd" />
            <path d="M7 17H13V18H7V17Z" fill="#dddddd" />
            <path d="M17 3L21 7H17V3Z" fill={getStepColor()} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-48 w-full relative bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="transform transition-transform hover:scale-110 duration-300">
        {getStepIcon()}
      </div>
      <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold z-10">
        {step}
      </div>
    </div>
  );
};

export default ThreeDStepIcon;
