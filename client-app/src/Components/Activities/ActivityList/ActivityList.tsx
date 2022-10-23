import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../interfaces/Activity";
import { useStore } from "./../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const [target, setTarget] = useState("");
  const { deleteActivity, isSubmitting, activitiesByDate } =
    useStore().activityStore;

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((a: Activity) => (
          <Item key={a.id}>
            <Item.Content>
              <Item.Header as={"a"}> {a.title}</Item.Header>
              <Item.Meta>{a.date}</Item.Meta>
              <Item.Description> {a.title}</Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  floated="right"
                  color="blue"
                  as={Link}
                  to={`/activities/${a.id}`}
                ></Button>
                <Button
                  content="Delete"
                  floated="right"
                  color="red"
                  onClick={() => {
                    deleteActivity(a.id);
                    setTarget(a.id);
                  }}
                  loading={isSubmitting && a.id === target}
                ></Button>
                <Label basic content={a.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
