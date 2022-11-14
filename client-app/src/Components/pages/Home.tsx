import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment inverted textAlign="center" vertical className="home-page">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo"></Image>
          Reactivities
        </Header>
        <Header inverted as="h2" content="Welcome to Reactivities"></Header>
        <Button
          as={Link}
          to="/activities"
          content="Take me to Reactivities"
          size="huge"
          inverted
        ></Button>
      </Container>
    </Segment>
  );
};

export default Home;
