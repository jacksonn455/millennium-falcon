import Search from "../components/Search";
import UserActive from "../components/UsersActive";
import { AppContainer } from "../components/Div";

function Home() {
  return (
    <AppContainer>
      <Search />
      <UserActive />
    </AppContainer>
  );
}

export default Home;
