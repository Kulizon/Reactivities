import { Activity } from "../../../interfaces/Activity";
import { useStore } from "../../../stores/store";

import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";

interface Props {
  editedActivity: Activity | undefined;
}

const ActivityForm = ({ editedActivity }: Props) => {
  const [target, setTarget] = useState("");
  const { closeForm, createActivity, updateActivity, isSubmitting } =
    useStore().activityStore;

  const isEdited = editedActivity;

  const [activityFormState, setActivityFormState] = useState<Activity>({
    id: isEdited ? editedActivity.id : "",
    title: isEdited ? editedActivity.title : "",
    date: isEdited ? editedActivity.date : "",
    category: isEdited ? editedActivity.category : "",
    description: isEdited ? editedActivity.description : "",
    city: isEdited ? editedActivity.city : "",
    venue: isEdited ? editedActivity.venue : "",
  });

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

    if (isEdited) updateActivity(activityFormState);
    else createActivity(activityFormState);
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
          onClick={closeForm}
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
