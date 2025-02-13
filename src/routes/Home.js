import Search from "../components/Search";
import UserActive from "../components/UsersActive";
import { AppContainer } from "../components/Div";
import Footer from "../components/Footer";

function Home() {
  return (
    <AppContainer>
      <Search />
      <UserActive />
      <Footer />
    </AppContainer>
  );
}

export default Home;
