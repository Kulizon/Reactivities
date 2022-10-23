import { Activity } from "../../../interfaces/Activity";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

import { Grid, List } from "semantic-ui-react";
import ActivityList from "../ActivityList/ActivityList";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ActivityForm from "../ActivityForm/ActivityForm";

const ActivityDashboard = () => {
  const { highlightedActivity, isFormOpen } = useStore().activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {!isFormOpen && highlightedActivity && (
          <ActivityDetails activity={highlightedActivity}></ActivityDetails>
        )}
        {isFormOpen && !highlightedActivity && (
          <ActivityForm editedActivity={undefined}></ActivityForm>
        )}
        {isFormOpen && highlightedActivity && (
          <ActivityForm editedActivity={highlightedActivity}></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
