// ProgressBar.js
import React from 'react';
import styled from 'styled-components';
const ProgressBarComponent = ({
  currentTime,
  progress,
  factor,
  handleProgressChange,
  totalDuration,
}) => {
  return (
    <ProgressContainer>
      <Timer>
        {Math.floor(currentTime / 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.floor(currentTime % 60)
          .toString()
          .padStart(2, '0')}
      </Timer>

      <ProgressBar
        value={progress || 0}
        max={factor}
        onChange={handleProgressChange}
      />
      <Timer>{totalDuration}</Timer>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.input.attrs({type: 'range'})`
  width: 80%;
  justify-self: center;
  align-self: center;
`;

const Timer = styled.span`
  color: #b3b3b3;
  padding: 0 10px;
`;

export default ProgressBarComponent;
