import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Menu inverted fixed="top" className={styles.header}>
      <Container>
        <Menu.Item header as={NavLink} to="/" end="true">
          <img src="assets/logo.png" alt="Logo" />
          Reactivities
        </Menu.Item>
        <div>
          <Menu.Item
            name="Activities"
            as={NavLink}
            to="/activities"
            end="true"
          ></Menu.Item>
          <Menu.Item name="Activities">
            <Button
              positive
              content="Create Activity"
              as={NavLink}
              to="/create-activity"
            ></Button>
          </Menu.Item>
        </div>
      </Container>
    </Menu>
  );
};

export default Header;
