import { Button, Container, Menu } from "semantic-ui-react";

import styles from "./Header.module.scss";

interface Props {
  onStartCreate: () => void;
}

const Header = ({ onStartCreate }: Props) => {
  return (
    <Menu inverted fixed="top" className={styles.header}>
      <Container>
        <Menu.Item header>
          <img src="assets/logo.png" alt="Logo" />
          Reactivities
        </Menu.Item>
        <div>
          <Menu.Item name="Activities"></Menu.Item>
          <Menu.Item name="Activities">
            <Button
              positive
              content="Create Activity"
              onClick={onStartCreate}
            ></Button>
          </Menu.Item>
        </div>
      </Container>
    </Menu>
  );
};

export default Header;
