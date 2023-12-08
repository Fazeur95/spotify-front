import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import PreviousButton from '../../assets/chevron-left.svg';
import NextButton from '../../assets/chevron-right.svg';

function NavigationButtons() {
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    //Previous page
    navigate(-1);
  };

  const handleNextClick = () => {
    //Next page
    //Si on ne peut pas aller à la page suivante grisée le bouton next

    navigate(1);
  };

  return (
    <ButtonContainer>
      <IconButton src={PreviousButton} onClick={handlePreviousClick} />
      <IconButton src={NextButton} onClick={handleNextClick} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  left: 20px;
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
