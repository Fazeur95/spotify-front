import {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

const AllPlaylist = () => {
  const [data, setData] = useState({tracks: [], albums: [], artists: []});
  const [searchTerm, setSearchTerm] = useState('');
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksResponse = await fetch('http://localhost:6868/api/track');
        const tracks = await tracksResponse.json();

        const albumsResponse = await fetch('http://localhost:6868/api/album');
        const albums = await albumsResponse.json();

        const artistsResponse = await fetch('http://localhost:6868/api/artist');
        const artists = await artistsResponse.json();

        setData({tracks, albums, artists});
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = {
    tracks: data.tracks.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    albums: data.albums.filter(album =>
      album.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    artists: data.artists.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  };

  return (
    <Container>
      <Header>
        <SearchBar
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearch}
        />
      </Header>
      <div>
        <Title>Parcourir tout</Title>

        <Content>
          {searchTerm && (
            <Results>
              <Section>
                <SectionTitle>Chansons</SectionTitle>
                <TrackList>
                  {filteredData.tracks.map(track => (
                    <Track
                      key={track._id}
                      onClick={() => {
                        setCurrentTrack(track);
                        setCurrentPlayingTrack(track);
                      }}>
                      <TrackImage
                        src={track.album?.imageUrl || track.imageUrl}
                      />
                      <TrackName>{track.name}</TrackName>
                      <TrackArtist>{track.artist}</TrackArtist>
                    </Track>
                  ))}
                </TrackList>
              </Section>
              <Section>
                <SectionTitle>Albums</SectionTitle>
                <AlbumList>
                  {filteredData.albums.map(album => (
                    <StyledLink to={`/album/${album._id}`} key={album._id}>
                      <Album key={album._id}>
                        <AlbumImage src={album.imageUrl} />
                        <AlbumName>{album.name}</AlbumName>
                        <AlbumArtist>{album.artist.name}</AlbumArtist>
                      </Album>
                    </StyledLink>
                  ))}
                </AlbumList>
              </Section>
              <Section>
                <SectionTitle>Artistes</SectionTitle>
                <ArtistList>
                  {filteredData.artists.map(artist => (
                    <StyledLink to={`/artist/${artist._id}`} key={artist._id}>
                      <Artist key={artist._id}>
                        <ArtistImage src={artist.imageUrl} />
                        <ArtistName>{artist.name}</ArtistName>
                      </Artist>
                    </StyledLink>
                  ))}
                </ArtistList>
              </Section>
            </Results>
          )}
        </Content>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
  color: white;
  font-family: Arial, sans-serif;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const Title = styled.h1`
  font-size: 2em;
  margin-left: 20px;
  margin-top: 20px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #282828;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px;
  border: none;
  margin-left: 8%;
  border-radius: 20px;
  outline: none;
  background-color: #282828;
  color: white;
  font-size: 16px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 50px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #282828;
  }
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const TrackName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TrackArtist = styled.p`
  font-size: 16px;
  color: #b3b3b3;
`;

const TrackDuration = styled.p`
  font-size: 16px;
  color: #b3b3b3;
`;

const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const Album = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const AlbumImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const AlbumName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const AlbumArtist = styled.p`
  font-size: 16px;
  color: #b3b3b3;
`;

const ArtistList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ArtistImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
`;

const ArtistName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

export default AllPlaylist;
