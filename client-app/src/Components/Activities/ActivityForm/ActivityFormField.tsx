import { ErrorMessage, Field, useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

const ActivityFormField = (props: { name: string }) => {
  // eslint-disable-next-line
  const [field, meta] = useField(props.name);

  const label = props.name[0].toUpperCase() + props.name.slice(1);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Field placeholder={label} name={props.name}></Field>
      {meta.touched && !!meta.error && (
        <ErrorMessage
          name={props.name}
          render={(error) => (
            <Label
              basic
              color="red"
              content={error}
              style={{ marginTop: "5px" }}
            ></Label>
          )}
        ></ErrorMessage>
      )}
    </FormField>
  );
};

export default ActivityFormField;
