import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "./../../UI/LoadingComponent/LoadingComponent";

const ActivityDetails = () => {
  const { id } = useParams();

  const activityStore = useStore().activityStore;

  const {
    loadActivity,
    isLoadingInitial,
    highlightedActivity: activity,
  } = activityStore;

  useEffect(() => {
    const sendRequest = async () => {
      if (!id) return;
      await loadActivity(id);
    };
    sendRequest();
  }, [activityStore, id, loadActivity]);

  if (isLoadingInitial) return <LoadingComponent></LoadingComponent>;
  if (!activity || !id) return <h1>No activity found</h1>;

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
            to={`/edit-activity/${activity.id}`}
            as={Link}
          ></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            to={`/activities`}
            as={Link}
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
