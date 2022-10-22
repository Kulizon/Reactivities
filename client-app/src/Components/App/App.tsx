import agent from "../../api/agent";
import { useState, useEffect } from "react";
import { Activity } from "../../interfaces/Activity";
import { v4 as uuid } from "uuid";

import { Container } from "semantic-ui-react";
import Header from "../Header/Header";
import ActivityDashboard from "../Activities/ActivityDashboard/ActivityDashboard";

import "semantic-ui-css/semantic.min.css";
import styles from "./App.module.scss";
import LoadingComponent from "../UI/LoadingComponent/LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [highlightedActivity, setHighlightedActivity] = useState<
    Activity | undefined
  >();

  const createOrEditActivityHandler = (
    activity: Activity,
    type: "EDIT" | "CREATE"
  ) => {
    setIsSubmitting(true);

    if (type === "CREATE") {
      const newActivity = { ...activity, id: uuid() };

      agent.Activities.create(newActivity).then(() => {
        setActivities((prevState) => [...prevState, newActivity]);
        setIsSubmitting(false);
        setCreateMode(false);
      });
    } else if (type === "EDIT") {
      if (activity.id) {
        agent.Activities.update(activity).then(() => {
          setActivities([
            ...activities.filter((a) => a.id !== activity.id),
            activity,
          ]);
          setIsSubmitting(false);
          setEditMode(false);
        });
      }

      setHighlightedActivity(activity);
    }
  };

  const deleteActivityHandler = (id: string) => {
    setIsDeleteSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities((prevActivities) => [
        ...prevActivities.filter((a) => a.id !== id),
      ]);
      setIsDeleteSubmitting(false);
    });
  };

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activities = response.map((a) => {
        return { ...a, date: a.date.split("T")[0] };
      });

      setActivities(activities);
      setIsLoading(false);
    });
  }, []);

  const highlightActivityHandler = (id: string) => {
    setHighlightedActivity(activities.find((a) => a.id === id));
    setEditMode(false);
    setCreateMode(false);
  };

  const cancelHighlightedActivityHandler = () => {
    setHighlightedActivity(undefined);
  };

  const startEditHandler = () => {
    setEditMode(true);
  };

  const endEditHandler = () => {
    setEditMode(false);
  };

  const submitEditHandler = (editedActivity: Activity) => {
    createOrEditActivityHandler(editedActivity, "EDIT");
  };

  const startCreateHandler = () => {
    setCreateMode(true);
    setEditMode(false);
    setHighlightedActivity(undefined);
  };

  const endCreateHandler = () => {
    setCreateMode(false);
  };

  const submitCreateHandler = (activity: Activity) => {
    createOrEditActivityHandler(activity, "CREATE");
  };

  if (isLoading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <Header onStartCreate={startCreateHandler}></Header>
      <Container className={styles.main}>
        <ActivityDashboard
          activities={activities}
          onDeleteActivity={deleteActivityHandler}
          isSubmitting={isSubmitting}
          isDeleteSubmitting={isDeleteSubmitting}
          onHighlightActivity={highlightActivityHandler}
          onCancelHighlightedActivity={cancelHighlightedActivityHandler}
          editMode={editMode}
          highlightedActivity={highlightedActivity}
          onStartEdit={startEditHandler}
          onEndEdit={endEditHandler}
          onSubmitEdit={submitEditHandler}
          onSubmitCreate={submitCreateHandler}
          onEndCreate={endCreateHandler}
          onStartCreate={startCreateHandler}
          createMode={createMode}
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default App;
