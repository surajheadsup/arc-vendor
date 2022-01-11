import React from 'react'
// import Lottie from 'react-lottie';
import animationData from './animationData.json'
const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className="loading">
        {/* <Lottie 
          options={defaultOptions}
          height={50}
          width={50}
        /> */}
        <label>Loading...</label>
      </div>
    );
};

export default Loading;
