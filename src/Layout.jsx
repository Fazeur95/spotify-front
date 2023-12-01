import styled from 'styled-components';
import AudioPlayer from '../src/components/AudioPlayer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Layout = ({children}) => (
  <LayoutContainer>
    <ContentContainer>{children}</ContentContainer>
    <AudioPlayer />
  </LayoutContainer>
);

export default Layout;
