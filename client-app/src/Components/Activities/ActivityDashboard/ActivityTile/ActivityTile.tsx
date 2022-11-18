import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Activity } from "../../../../interfaces/Activity";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
}

const ActivityTile = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            ></Item.Image>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
                content={activity.title}
              ></Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon>{" "}
          {activity.date?.toISOString().split("T")[0]}
          <Icon name="marker"></Icon> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityTile;
