import {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PlayButton from '../../assets/play.svg';
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

        const playlistResponse = await fetch(
          'http://localhost:6868/api/playlist',
        );
        const playlists = await playlistResponse.json();

        setData({tracks, albums, artists, playlists});
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data && {
    tracks: data.tracks?.filter(track =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    albums: data.albums?.filter(album =>
      album.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    artists: data.artists?.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    playlists: data.playlists?.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  };
  console.log(filteredData.tracks);

  return (
    <Container>
      <Header>
        <SearchBar
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearch}
        />
      </Header>

      <Main>
        <Content>
          {searchTerm &&
            filteredData &&
            (filteredData.tracks?.length > 0 ||
              filteredData.playlists?.length > 0 ||
              filteredData.albums?.length > 0 ||
              filteredData.artists?.length > 0) && (
              <Results>
                {filteredData.tracks?.length > 0 && (
                  <Section>
                    <SectionTitle>Titres</SectionTitle>
                    <TrackList>
                      {filteredData.tracks.map(track => {
                        const isPlaying =
                          currentTrack && currentTrack._id === track._id; // Vérifier si la piste est en cours de lecture

                        return (
                          <Track key={track._id}>
                            <TrackImage
                              onClick={() => {
                                setCurrentTrack(track);
                                setCurrentPlayingTrack(track);
                              }}
                              src={track.album?.imageUrl || track.imageUrl}
                              alt='Pochette de l"album'
                            />
                            <TrackInfo>
                              <TrackName isPlaying={isPlaying}>
                                {track.name}
                              </TrackName>

                              <TrackArtist>
                                {track.album?.artist?.name}
                              </TrackArtist>
                            </TrackInfo>
                          </Track>
                        );
                      })}
                    </TrackList>
                  </Section>
                )}
                {filteredData.albums.length > 0 && (
                  <Section>
                    <SectionTitle>Albums</SectionTitle>
                    <AlbumList>
                      {filteredData.albums.map(album => (
                        <StyledLink to={`/album/${album._id}`} key={album._id}>
                          <Album key={album._id}>
                            <AlbumImage
                              src={album.imageUrl}
                              alt="Album Cover"
                            />
                            <AlbumName>{album.name}</AlbumName>
                            <AlbumArtist>{album.artist.name}</AlbumArtist>
                          </Album>
                        </StyledLink>
                      ))}
                    </AlbumList>
                  </Section>
                )}
                {filteredData.artists.length > 0 && (
                  <Section>
                    <SectionTitle>Artistes</SectionTitle>
                    <ArtistList>
                      {filteredData.artists.map(artist => (
                        <StyledLink
                          to={`/artist/${artist._id}`}
                          key={artist._id}>
                          <Artist key={artist._id}>
                            <ArtistImage
                              src={artist.imageUrl}
                              alt="Album Cover"
                            />
                            <ArtistName>{artist.name}</ArtistName>
                          </Artist>
                        </StyledLink>
                      ))}
                    </ArtistList>
                  </Section>
                )}
                {filteredData.playlists.length > 0 && (
                  <Section>
                    <SectionTitle>Playlists</SectionTitle>
                    <AlbumList>
                      {filteredData.playlists.map(playlist => (
                        <StyledLink
                          to={`/playlist/${playlist._id}`}
                          key={playlist._id}>
                          <Album key={playlist._id}>
                            <AlbumImage
                              src={playlist.imageUrl}
                              alt="Album Cover"
                            />
                            <AlbumName>{playlist.name}</AlbumName>
                          </Album>
                        </StyledLink>
                      ))}
                    </AlbumList>
                  </Section>
                )}
              </Results>
            )}
        </Content>
      </Main>
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
  border-radius: 7px;
  padding: 0 1rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const SearchBar = styled.input`
  width: 80%;
  padding: 1rem;
  border: none;
  margin-left: 8%;
  border-radius: 20px;
  outline: none;
  background-color: #282828;
  color: white;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: 300px;
  }
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
  width: 100%;
  background-color: #121212;
  overflow-x: hidden;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  color: white;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  border-radius: 5px;
  &:hover {
    background-color: #282828;

    transition: 0.2s ease-in-out;
  }
`;

const TrackImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const TrackName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.isPlaying ? '#1DB954' : '#FFFFFF')};
  margin-bottom: 0px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TrackArtist = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  margin-top: 0px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #fff;
  }
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
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const ArtistName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export default AllPlaylist;
