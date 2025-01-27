import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Menu from "../Menu";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 10px;
    align-items: flex-start;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1024px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    margin-top: 10px;
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const HamburgerButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 30px;
  }
`;

const MenuList = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <HeaderContainer>
      <StyledLink to="/">
        <Logo />
      </StyledLink>
      <HamburgerButton onClick={toggleMenu}>
        ☰
      </HamburgerButton>
      <MenuContainer isOpen={isMenuOpen}>
        <MenuList>
          <Menu />
        </MenuList>
      </MenuContainer>
    </HeaderContainer>
  );
}

export default Header;