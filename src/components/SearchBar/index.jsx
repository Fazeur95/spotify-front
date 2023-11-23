import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

const SearchBarContainer = styled.form`
  display: flex;

  margin-bottom: 20px;
  background-color: #121212;
  border-radius: 500px;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  background-color: #121212;
  color: #b3b3b3;

  padding: 5px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  height: 30px;
  border: none;
  background-color: #121212;
  color: #b3b3b3;
  margin-left: 10px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 20px; /* Ajustez la taille selon vos besoins */
`;
const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid white;
`;

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <SearchBarContainer onSubmit={handleSubmit}>
      <SearchInputContainer>
        <Logo src={SearchIcon} alt="Search Icon" />
        <SearchInput
          type="text"
          placeholder="Que souhaitez-vous écouter ?"
          value={searchTerm}
          onChange={handleChange}
        />
      </SearchInputContainer>
      <SearchButton type="submit">Rechercher</SearchButton>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
