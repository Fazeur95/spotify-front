import React from 'react';
import styled from 'styled-components';
import VolumeLogoOff from '../../../assets/volume-off.svg';
import VolumeLogoMedium from '../../../assets/volume-medium.svg';
import VolumeLogoHigh from '../../../assets/volume-high.svg';

const VolumeControl = ({
  volumeValue,
  setVolumeValue,
  MuteSound,
  volumeLogo,
}) => {
  return (
    <div>
      <button onClick={MuteSound}>
        <IconStyled src={volumeLogo} alt="Volume Logo" />
      </button>
      <VolumeControlStyled
        value={volumeValue}
        onChange={e => setVolumeValue(e.target.value)}
      />
    </div>
  );
};
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

const VolumeControlStyled = styled.input.attrs({type: 'range'})`
  display: flex;
  align-items: center;
  justifycontent: center;
  &:hover {
  }
`;
export default VolumeControl;
