import agent from "../../api/agent";
import { useState, useEffect } from "react";
import { Activity } from "../../interfaces/Activity";

import { useStore } from "../../stores/store";

import { Container } from "semantic-ui-react";
import Header from "../Header/Header";
import ActivityDashboard from "../Activities/ActivityDashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";

import "semantic-ui-css/semantic.min.css";
import styles from "./App.module.scss";
import LoadingComponent from "../UI/LoadingComponent/LoadingComponent";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.isLoadingInitial)
    return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <Header></Header>
      <Container className={styles.main}>
        <ActivityDashboard
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default observer(App);
