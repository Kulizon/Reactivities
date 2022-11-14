import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  return (
    <>
      <Menu
        vertical
        size="large"
        style={{ width: "100%", marginTop: "3.9rem" }}
      >
        <Header icon="filter" attached color="teal" content="Filters"></Header>
        <Menu.Item content="All activities"></Menu.Item>
        <Menu.Item content="I'm going"></Menu.Item>
        <Menu.Item content="I'm hosting"></Menu.Item>
      </Menu>
      <Header>
        <Calendar></Calendar>
      </Header>
    </>
  );
};

export default ActivityFilters;
