import { Activity } from "../../../interfaces/Activity";
import { useStore } from "../../../stores/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const [activityFormState, setActivityFormState] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    category: "",
    description: "",
    city: "",
    venue: "",
  });

  const { createActivity, updateActivity, isSubmitting, loadActivity } =
    useStore().activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      setActivityFormState({
        id: "",
        title: "",
        date: "",
        category: "",
        description: "",
        city: "",
        venue: "",
      });

      if (id) {
        const editedActivity = await loadActivity(id);

        console.log(editedActivity);

        if (editedActivity) {
          setActivityFormState({
            id: editedActivity.id,
            title: editedActivity.title,
            date: editedActivity.date,
            category: editedActivity.category,
            description: editedActivity.description,
            city: editedActivity.city,
            venue: editedActivity.venue,
          });
        }
      }
    };
    sendRequest();
  }, [id, loadActivity]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setActivityFormState((prevState) => {
      return {
        ...prevState,
        [e.target.placeholder.toLocaleLowerCase()]: e.target.value,
      };
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id)
      updateActivity(activityFormState).then((id: string) =>
        navigate(`/activities/${id}`)
      );
    else
      createActivity(activityFormState).then((id: string) =>
        navigate(`/activities/${id}`)
      );
  };

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler}>
        <Form.Input
          placeholder="Title"
          value={activityFormState.title}
          onChange={inputChangeHandler}
        ></Form.Input>
        <Form.Input
          placeholder="Description"
          value={activityFormState.description}
          onChange={inputChangeHandler}
        ></Form.Input>
        <Form.Input
          placeholder="Category"
          value={activityFormState.category}
          onChange={inputChangeHandler}
        ></Form.Input>
        <Form.Input
          placeholder="Date"
          value={activityFormState.date}
          onChange={inputChangeHandler}
          type="date"
        ></Form.Input>
        <Form.Input
          placeholder="City"
          value={activityFormState.city}
          onChange={inputChangeHandler}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activityFormState.venue}
          onChange={inputChangeHandler}
        ></Form.Input>
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={isSubmitting}
        ></Button>
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          to={`/activities${id ? "/" + id : ""}`}
          as={Link}
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
