import Lottie from 'lottie-react';
// import loadingAnimation from '@/public/Scanning.json' assert { type: 'json' }; 
import loadingAnimation from '@/public/Loading.json' assert { type: 'json' }; 

 const LottieLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
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

export default LottieLoading;
