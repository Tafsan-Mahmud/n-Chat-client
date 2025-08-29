import React from 'react';
const Multibg = () => {
  return (
    <div className='absolute inset-0 overflow-hidden z-0'>
      <div className='w-[80vw] h-[80vh] rounded-full bottom-0 left-[-25vw] absolute bg-blue-800' style={{ transform: 'translateY(50%)' }}></div>

      <div className='w-[60vw] h-[60vh] rounded-full top-0 right-[-10vw] absolute bg-blue-800' style={{ transform: 'translateY(-50%)' }}></div>

      <div className='bg-white/50 backdrop-blur-[150px] absolute inset-0 z-10'></div>
      
      <div className='bg-sky-200 absolute inset-0 -z-10'></div>
    </div>
  );
};

export default Multibg;
