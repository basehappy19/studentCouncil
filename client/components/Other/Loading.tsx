import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0%, 95% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

const topAnimation = keyframes`
  95%, 100% {
    background-position: 0 44.8px;
  }
`;

const bottomAnimation = keyframes`
  95%, 100% {
    background-position: 0 0;
  }
`;

const Progress = styled.div`
  height: 89.6px;
  width: 44.8px;
  animation: ${rotate} 2.4s ease infinite;
  position: relative;
`;

const Top = styled.div`
  background-color: #8ed7ff;
  background-image: linear-gradient(#f8f063, #f8f063);
  background-size: 44.8px 44.8px;
  background-repeat: no-repeat;
  width: 44.8px;
  height: 44.8px;
  background-position: 0 0;
  animation: ${topAnimation} 2.4s ease infinite;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
`;

const Bottom = styled.div`
  background-color: #8ed7ff;
  background-image: linear-gradient(#f8f063, #f8f063);
  background-size: 44.8px 44.8px;
  background-repeat: no-repeat;
  width: 44.8px;
  height: 44.8px;
  background-position: 0 44.8px;
  animation: ${bottomAnimation} 2.4s ease infinite;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  
  &::after {
    content: "";
    position: absolute;
    width: 2.2px;
    height: 44.8px;
    left: 21.3px;
    background-image: linear-gradient(#f8f063, transparent);
  }
`;

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <Progress>
      <Top />
      <Bottom />
    </Progress>
  </div>
);

export default Loading;
