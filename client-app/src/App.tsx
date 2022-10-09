import axios from "axios";
import { useState, useEffect } from "react";

import { List, Header } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);

      setActivities(response.data);
    });
  }, []);

  console.log(activities);

  return (
    <div className="app">
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((a: any) => (
          <List.Item key={a.id}>{a.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
