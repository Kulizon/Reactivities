import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList/ActivityList";
import ActivityFilters from "./ActivityFilters/ActivityFilters";
import LoadingComponent from "../../UI/LoadingComponent/LoadingComponent";

const ActivityDashboard = () => {
  const { activityStore } = useStore();

  const { loadActivities, isLoadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityStore, activityRegistry.size, loadActivities]);

  if (isLoadingInitial) return <LoadingComponent></LoadingComponent>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
