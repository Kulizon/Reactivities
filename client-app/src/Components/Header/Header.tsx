import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";

import styles from "./Header.module.scss";

const Header = () => {
  const { openForm, cancelHighlightedActivity } = useStore().activityStore;

  const openCreateFormHandler = () => {
    openForm();
    cancelHighlightedActivity();
  };

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
              onClick={openCreateFormHandler}
            ></Button>
          </Menu.Item>
        </div>
      </Container>
    </Menu>
  );
};

export default Header;
