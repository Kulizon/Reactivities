import axios from "axios";
import { useState, useEffect } from "react";
import { Activity } from "../../Interfaces/Activity";
import { v4 as uuid } from "uuid";

import { Container } from "semantic-ui-react";
import Header from "../Header/Header";
import ActivityDashboard from "../Activities/ActivityDashboard/ActivityDashboard";

import "semantic-ui-css/semantic.min.css";
import styles from "./App.module.scss";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const createOrEditActivityHandler = (
    activity: Activity,
    type: "EDIT" | "CREATE"
  ) => {
    if (type === "CREATE") {
      setActivities((prevState) => [...prevState, { ...activity, id: uuid() }]);
    } else if (type === "EDIT") {
      setActivities((prevState) => [
        ...prevState.map((a) => {
          if (a.id === activity.id) return activity;
          else return a;
        }),
      ]);
    }
  };

  const deleteActivityHandler = (id: string) => {
    setActivities((prevActivities) => [
      ...prevActivities.filter((a) => a.id !== id),
    ]);
  };

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <Container className={styles.main}>
        <ActivityDashboard
          activities={activities}
          onCreateOrEdit={createOrEditActivityHandler}
          onDeleteActivity={deleteActivityHandler}
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default App;
