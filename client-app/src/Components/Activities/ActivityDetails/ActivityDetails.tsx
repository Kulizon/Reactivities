import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../UI/LoadingComponent";
import ActivityDetaileHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

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
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetaileHeader activity={activity}></ActivityDetaileHeader>
        <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar></ActivityDetailedSidebar>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
