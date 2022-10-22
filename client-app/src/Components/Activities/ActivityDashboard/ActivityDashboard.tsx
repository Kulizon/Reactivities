import { useState } from "react";

import { Activity } from "../../../interfaces/Activity";

import { Grid, List } from "semantic-ui-react";
import ActivityList from "../ActivityList/ActivityList";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import ActivityForm from "../ActivityForm/ActivityForm";

interface Props {
  activities: Activity[];
  onDeleteActivity: (id: string) => void;
  isSubmitting: boolean;
  editMode: boolean;
  onHighlightActivity: (id: string) => void;
  onCancelHighlightedActivity: () => void;
  highlightedActivity: Activity | undefined;
  onEndEdit: () => void;
  onStartEdit: () => void;
  onSubmitEdit: (editedActivity: Activity) => void;
  onSubmitCreate: (activity: Activity) => void;
  onEndCreate: () => void;
  onStartCreate: () => void;
  createMode: boolean;
  isDeleteSubmitting: boolean;
}

const ActivityDashboard = ({
  activities,
  onDeleteActivity,
  isSubmitting,
  onHighlightActivity,
  onCancelHighlightedActivity,
  editMode,
  highlightedActivity,
  onStartEdit,
  onEndEdit,
  onSubmitEdit,
  onSubmitCreate,
  onEndCreate,
  createMode,
  isDeleteSubmitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          onHighlightActivity={onHighlightActivity}
          onDeleteActivity={onDeleteActivity}
          isSubmitting={isDeleteSubmitting}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {!editMode && !isSubmitting && !createMode && highlightedActivity && (
          <ActivityDetails
            activity={highlightedActivity}
            onCancelHighlightedActivity={onCancelHighlightedActivity}
            onStartEdit={onStartEdit}
          ></ActivityDetails>
        )}
        {editMode && !createMode && (
          <ActivityForm
            onEndEdit={onEndEdit}
            editedActivity={highlightedActivity}
            editMode={editMode}
            onSubmitEdit={onSubmitEdit}
            isSubmitting={isSubmitting}
            createMode={createMode}
            onSubmitCreate={onSubmitCreate}
            onEndCreate={onEndCreate}
          ></ActivityForm>
        )}
        {createMode && (
          <ActivityForm
            onEndEdit={onEndEdit}
            editedActivity={undefined}
            editMode={editMode}
            onSubmitEdit={onSubmitEdit}
            isSubmitting={isSubmitting}
            createMode={createMode}
            onSubmitCreate={onSubmitCreate}
            onEndCreate={onEndCreate}
          ></ActivityForm>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
