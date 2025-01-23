import { ReactComponent as ListIcon } from "../../assets/images/list.svg";
import { ReactComponent as ContactIcon } from "../../assets/images/contact.svg";
import { ReactComponent as PackageIcon } from "../../assets/images/box-solid.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "ANAMNESES", icon: <ListIcon />, route: "/anamneses" },
  { name: "PRODUTOS", icon: <PackageIcon />, route: "/produtos" },
  { name: "AGENDA", icon: <ContactIcon />, route: "/agenda" },
];

const Icons = styled.ul`
  display: flex;
  align-items: center;
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
`;

function Menu() {
  return (
    <Icons>
      {menuItems.map((item) => (
        <IconLink to={item.route.toLowerCase()} key={item.name}>
          <Icon>
            {item.icon}
            {item.name}
          </Icon>
        </IconLink>
      ))}
    </Icons>
  );
}

export default Menu;