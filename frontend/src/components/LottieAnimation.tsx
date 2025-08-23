"use client";

import Lottie from 'lottie-react';
import flow1Animation from '/public/vidoes/Flow 1.json';

export default function LottieAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie 
        animationData={flow1Animation}
        loop={true}
        autoplay={true}
        style={{ 
          width: '100%', 
          height: '100%',
          maxWidth: '600px',
          maxHeight: '600px'
        }}
      />
    </div>
  );
}
