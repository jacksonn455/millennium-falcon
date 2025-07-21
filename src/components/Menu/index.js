import { ReactComponent as ListIcon } from "../../assets/images/list.svg";
import { ReactComponent as ContactIcon } from "../../assets/images/contact.svg";
import { ReactComponent as PackageIcon } from "../../assets/images/box-solid.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "ANAMNESES", icon: <ListIcon />, route: "/anamneses" },
  { name: "PRODUTOS", icon: <PackageIcon />, route: "/produtos" },
  { name: "AGENDA", icon: <ContactIcon />, route: "/agenda" },
  { name: "VENDAS", icon: <PackageIcon />, route: "/vendas" },
  { name: "SERVIÇOS", icon: <PackageIcon />, route: "/servicos" },
];

const Icons = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const IconLink = styled(Link)`
  text-decoration: none;
`;

const Icon = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  font-weight: bold;
  color: #a8235e;
  font-family: "Noto Serif", serif;
  cursor: pointer;
  text-align: center;
  padding: 0 15px;
  min-width: 150px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0073;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: fill 0.3s ease;
    fill: #a8235e;
  }

  &:hover svg {
    fill: #ff0073;
  }

  .desktop-only {
    display: block;
  }

  .mobile-only {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    gap: 0;
    padding: 10px;
    min-width: unset;
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: block;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

function Menu() {
  return (
    <Icons>
      {menuItems.map((item) => (
        <IconLink to={item.route.toLowerCase()} key={item.name}>
          <Icon>
            <span className="desktop-only">{item.icon}</span>
            <span className="mobile-only">{item.name}</span>
            <span className="desktop-only">{item.name}</span>
          </Icon>
        </IconLink>
      ))}
    </Icons>
  );
}

export default Menu;
