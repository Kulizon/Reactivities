import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

import { Navigate } from "react-router";

const ServerError = () => {
  const { commonStore } = useStore();

  if (!commonStore.serverErrorStackTrace) {
    return <Navigate to="/activities"></Navigate>;
  }

  return (
    <Container>
      <Header as="h1" content="Server Error"></Header>
      {/* <Header
        sub
        as="h5"
        color="red"
        content={commonStore.error?.message}
      ></Header> */}
      {commonStore.serverErrorStackTrace && (
        <Segment>
          <Header sub as="h4" color="teal" content="Stack trace"></Header>
          <code style={{ marginTop: "10px" }}>
            {commonStore.serverErrorStackTrace}
          </code> 
        </Segment>
      )}
    </Container>
  );
};

export default observer(ServerError);
