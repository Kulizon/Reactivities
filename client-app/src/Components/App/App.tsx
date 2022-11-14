import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import { Container } from "semantic-ui-react";
import Header from "../Header/Header";
import ActivityDashboard from "../Activities/ActivityDashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";

import "semantic-ui-css/semantic.min.css";
import ActivityForm from "../Activities/ActivityForm/ActivityForm";
import ActivityDetails from "../Activities/ActivityDetails/ActivityDetails";

function App() {
  return (
    <>
      <Header></Header>
      <Container className='main'>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/activities"
            element={<ActivityDashboard></ActivityDashboard>}
          ></Route>
          <Route
            path="/activities/:id"
            element={<ActivityDetails></ActivityDetails>}
          ></Route>
          <Route
            path="/create-activity"
            element={<ActivityForm></ActivityForm>}
          ></Route>
          <Route
            path="/edit-activity/:id"
            element={<ActivityForm></ActivityForm>}
          ></Route>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
