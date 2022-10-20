import { Activity } from "../../../Interfaces/Activity";


import { Button, Card, Image } from "semantic-ui-react";

interface Props {
  activity: Activity;
  onCancelHighlightedActivity: () => void;
  onStartEdit: (editedActivity: Activity) => void;
}

const ActivityDetails = ({
  activity,
  onCancelHighlightedActivity,
  onStartEdit,
}: Props) => {
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
            onClick={() => onStartEdit(activity)}
          ></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={onCancelHighlightedActivity}
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
