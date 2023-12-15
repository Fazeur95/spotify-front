import {useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext, useMemo} from 'react';
import styled from 'styled-components';
import PreviousButton from '../../assets/chevron-left.svg';
import NextButton from '../../assets/chevron-right.svg';

function NavigationButtons() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const handlePreviousClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    navigate(1);
  };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 1;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Nettoyer l'écouteur d'événements lors du démontage du composant
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ButtonContainer isScrolled={isScrolled}>
      <IconButton
        src={PreviousButton}
        onClick={handlePreviousClick}
        alt="Previous"
      />
      <IconButton src={NextButton} onClick={handleNextClick} alt="Next" />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  top: 20px;
  left: 22%;
  background-color: ${({isScrolled}) =>
    isScrolled ? 'rgba(0,0,0,0.8)' : 'transparent'};
`;

const IconButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 5px;
  background-color: #282828;

  transition: 0.2s;
  z-index: 1;

  &:hover {
    filter: brightness(75%);
    transform: scale(1.1);
  }
`;

export default NavigationButtons;
