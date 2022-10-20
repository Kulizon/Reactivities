import { useState } from "react";

import { Activity } from "../../../Interfaces/Activity";

import { Grid, List } from "semantic-ui-react";
import ActivityList from "./../ActivityList/ActivityList";
import ActivityDetails from "./../ActivityDetails/ActivityDetails";
import ActivityForm from "../ActivityForm/ActivityForm";

interface Props {
  activities: Activity[];
  onCreateOrEdit: (activity: Activity, type: "EDIT" | "CREATE") => void;
  onDeleteActivity: (id: string) => void;
}

const ActivityDashboard = ({
  activities,
  onCreateOrEdit,
  onDeleteActivity,
}: Props) => {
  const [highlightedActivity, setHighlightedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);

  const highlightActivityHandler = (id: string) => {
    setHighlightedActivity(activities.find((a) => a.id === id));
    setEditMode(false);
  };

  const cancelHighlightedActivityHandler = () => {
    setHighlightedActivity(undefined);
  };

  const startEditHandler = (editedActivity: Activity) => {
    setEditMode(true);
  };

  const endEditHandler = () => {
    setEditMode(false);
  };

  const submitEditHandler = (editedActivity: Activity) => {
    setEditMode(false);
    setHighlightedActivity(undefined);
    onCreateOrEdit(editedActivity, "EDIT");
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          onHighlightActivity={highlightActivityHandler}
          onDeleteActivity={onDeleteActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {!editMode && highlightedActivity && (
          <ActivityDetails
            activity={highlightedActivity}
            onCancelHighlightedActivity={cancelHighlightedActivityHandler}
            onStartEdit={startEditHandler}
          ></ActivityDetails>
        )}
        {editMode && (
          <ActivityForm
            onEndEdit={endEditHandler}
            editedActivity={highlightedActivity}
            editMode={editMode}
            onSubmit={submitEditHandler}
          ></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
