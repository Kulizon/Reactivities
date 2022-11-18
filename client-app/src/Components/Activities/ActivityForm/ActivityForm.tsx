import { Activity } from "../../../interfaces/Activity";
import { useStore } from "../../../stores/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Header, Segment } from "semantic-ui-react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ActivityFormField from "./ActivityFormField";
import ActivityFormTextarea from "./ActivityFormTextarea";
import ActivityFormDropdown from "./ActivityFormDropdown";
import ActivityDateField from "./ActivityDateField";

const validationSchema = Yup.object({
  title: Yup.string().required("The activity title is required"),
  description: Yup.string().required("The activity description is required"),
  date: Yup.string().required("The activity date is required"),
  category: Yup.string().required("The activity category is required"),
  city: Yup.string().required("The activity city is required"),
  venue: Yup.string().required("The activity venue is required"),
});

const options = [
  { text: "Drinks", value: "drinks" },
  { text: "Culture", value: "culture" },
  { text: "Film", value: "film" },
  { text: "Food", value: "food" },
  { text: "Music", value: "music" },
  { text: "Travel", value: "travel" },
];

const ActivityForm = () => {
  const [activityFormState, setActivityFormState] = useState<Activity>({
    id: "",
    title: "",
    date: null,
    category: "",
    description: "",
    city: "",
    venue: "",
  });

  const { createActivity, updateActivity, loadActivity } =
    useStore().activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      setActivityFormState({
        id: "",
        title: "",
        date: null,
        category: "",
        description: "",
        city: "",
        venue: "",
      });

      if (id) {
        const editedActivity = await loadActivity(id);

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

  const submitFormHandler = (values: any) => {
    if (id)
      updateActivity(values).then((id: string) =>
        navigate(`/activities/${id}`)
      );
    else
      createActivity(values).then((id: string) =>
        navigate(`/activities/${id}`)
      );
  };

  return (
    <Segment clearing>
      <Header content="Activity details" sub color="teal"></Header>
      <Formik
        initialValues={activityFormState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          submitFormHandler(values);
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className="ui form">
            <ActivityFormField name="title"></ActivityFormField>
            <ActivityFormTextarea
              name="description"
              defaultValue={activityFormState.description}
              rows={5}
            ></ActivityFormTextarea>
            <ActivityFormDropdown
              options={options}
              name="category"
            ></ActivityFormDropdown>
            <ActivityDateField name="date"></ActivityDateField>
            <ActivityFormField name="city"></ActivityFormField>
            <ActivityFormField name="venue"></ActivityFormField>
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
              disabled={isSubmitting || !dirty || !isValid}
            ></Button>
            <Button
              floated="right"
              type="submit"
              content="Cancel"
              to={`/activities${id ? "/" + id : ""}`}
              as={Link}
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
