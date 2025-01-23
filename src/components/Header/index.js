import { Link } from "react-router-dom";
import Logo from "../Logo";
import Menu from "../Menu";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Header() {
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <Logo />
      </StyledLink>
      <Menu />
    </HeaderContainer>
  );
}

export default Header;
