import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #121212;
  border-radius: 500px;
  padding: 15px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  width: 600px;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 30px;
  border-radius: 20px;
  border: 1px solid #282828;
  background-color: #121212;
  color: #b3b3b3;
  &:focus {
    outline: none;
    border: 1px solid white;
  }
`;

const SearchIconStyled = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <SearchBarContainer onSubmit={e => e.preventDefault()}>
      <SearchInputContainer>
        <SearchIconStyled src={SearchIcon} alt="Search Icon" />
        <SearchInput
          type="text"
          placeholder="Que souhaitez-vous écouter ?"
          value={searchTerm}
          onChange={handleChange}
        />
      </SearchInputContainer>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
