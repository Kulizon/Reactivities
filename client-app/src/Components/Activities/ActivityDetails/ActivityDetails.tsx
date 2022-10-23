import { Activity } from "../../../interfaces/Activity";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

import { Button, Card, Image } from "semantic-ui-react";

interface Props {
  activity: Activity;
}

const ActivityDetails = ({ activity }: Props) => {
  const { cancelHighlightedActivity, openForm, highlightActivity } =
    useStore().activityStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => {
              highlightActivity(activity.id);
              openForm();
            }}
          ></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelHighlightedActivity}
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
