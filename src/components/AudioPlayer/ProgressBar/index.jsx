import React from 'react';
import styled from 'styled-components';

const Progress = ({progress, totalDuration, handleProgressChange}) => {
  return (
    <div>
      <Timer>
        {Math.floor(progress / 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.floor(progress % 60)
          .toString()
          .padStart(2, '0')}
      </Timer>
      <ProgressBar
        value={progress || 0}
        max={1000}
        onChange={handleProgressChange}
      />
      <Timer>{totalDuration}</Timer>
    </div>
  );
};
const ProgressBar = styled.input.attrs({type: 'range'})`
  width: 80%;
  justify-self: center;
  align-self: center;
`;

const Timer = styled.span`
  color: #b3b3b3;
  padding: 0 10px;
`;
export default Progress;
