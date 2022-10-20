import { Activity } from "../../../Interfaces/Activity";

import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  onEndEdit: () => void;
  editedActivity: Activity | undefined;
  editMode: boolean;
  onSubmit: (editedActivity: Activity) => void;
}

const ActivityForm = ({
  onEndEdit,
  editedActivity,
  editMode,
  onSubmit,
}: Props) => {
  const isEdited = editedActivity && editMode;

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

    console.log(activityFormState);

    onSubmit(activityFormState);
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
        ></Button>
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={onEndEdit}
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
