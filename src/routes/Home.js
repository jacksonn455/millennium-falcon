import styled from "styled-components";
import Search from "../components/Search";
import UserActive from "../components/UsersActive";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Home() {
  return (
    <AppContainer>
      <Search />
      <UserActive />
    </AppContainer>
  );
}

export default Home;
