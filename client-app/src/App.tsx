import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";

import { Container } from "semantic-ui-react";
import Header from "./components/Header/Header";
import ActivityDashboard from "./components/Activities/ActivityDashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";

import "semantic-ui-css/semantic.min.css";
import ActivityForm from "./components/Activities/ActivityForm/ActivityForm";
import ActivityDetails from "./components/Activities/ActivityDetails/ActivityDetails";
import TestErrors from "./components/Errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/Errors/NotFound";
import ServerError from "./components/Errors/ServerError";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"></ToastContainer>
      <Header></Header>
      <Container className="main">
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
          <Route
            path="/test-errors"
            element={<TestErrors></TestErrors>}
          ></Route>
          <Route
            path="/server-error"
            element={<ServerError></ServerError>}
          ></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
