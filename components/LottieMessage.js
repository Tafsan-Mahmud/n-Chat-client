// components/LottieMessage.js
import React from 'react';
import Lottie from 'lottie-react';
import messageAnimation from '@/public/Message.json' assert { type: 'json' }; 

const LottieMessage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: messageAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ width: 500, height: 500}}> {/* Adjust size as needed */}
      <Lottie
        animationData={defaultOptions.animationData}
        loop={defaultOptions.loop}
        autoplay={defaultOptions.autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieMessage;


