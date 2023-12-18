// VolumeControls.js
import React, {useContext} from 'react';
import styled from 'styled-components';
import VolumeLogoOff from '../../../assets/volume-off.svg';
import VolumeLogoMedium from '../../../assets/volume-medium.svg';
import VolumeLogoHigh from '../../../assets/volume-high.svg';
import MaximizeLogo from '../../../assets/maximize-2.svg';

const VolumeControlComponent = ({
  volumeLogo,
  MuteSound,
  volumeValue,
  handleVolumeChange,
  handleMaximizeClick,
}) => {
  return (
    <VolumeContainer>
      <IconStyled src={volumeLogo} onClick={MuteSound} alt="Volume Logo" />
      <VolumeControl
        min="0"
        max="1"
        style={{
          color: 'green',
        }}
        step={0.01}
        value={volumeValue}
        onChange={handleVolumeChange}
      />
      <IconStyled
        src={MaximizeLogo}
        alt="Maximize"
        onClick={handleMaximizeClick}
      />
    </VolumeContainer>
  );
};

const VolumeContainer = styled.div`
  margin: auto 0;
  display: flex;
  align-self: center;
`;
const VolumeControl = styled.input.attrs({type: 'range'})`
  display: flex;
  align-items: center;
  justifycontent: center;
  &:hover {
  }
`;
const IconStyled = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  &&:hover {
    opacity: 0.5;
  }
  &&:clicked {
    opacity: 0.5;
  }
`;

export default VolumeControlComponent;
