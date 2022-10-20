import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "./../../../Interfaces/Activity";

interface Props {
  activities: Activity[];
  onHighlightActivity: (id: string) => void;
  onDeleteActivity: (id: string) => void;
}

const ActivityList = ({
  activities,
  onHighlightActivity,
  onDeleteActivity,
}: Props) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((a: Activity) => (
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
                  onClick={() => onHighlightActivity(a.id)}
                ></Button>
                <Button
                  content="Delete"
                  floated="right"
                  color="red"
                  onClick={() => onDeleteActivity(a.id)}
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

export default ActivityList;
