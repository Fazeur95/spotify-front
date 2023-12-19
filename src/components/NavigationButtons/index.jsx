import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import PreviousButton from '../../assets/chevron-left.svg';
import NextButton from '../../assets/chevron-right.svg';

function NavigationButtons() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ButtonContainer isScrolled={isScrolled}>
      <IconButton
        src={PreviousButton}
        onClick={() => navigate(-1)}
        alt="Previous"
      />
      <IconButton src={NextButton} onClick={() => navigate(1)} alt="Next" />
    </ButtonContainer>
  );
}
const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100rem;
  align-items: center;
  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
  left: 22%;
`;

const IconButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  background-color: #282828;
  margin: 0 15px;
  transition: 0.2s;
  &:hover {
    filter: brightness(75%);
    transform: scale(1.1);
  }
`;
export default NavigationButtons;
