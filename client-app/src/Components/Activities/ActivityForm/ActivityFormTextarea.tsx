import { ErrorMessage, useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

const ActivityFormTextarea = (props: {
  name: string;
  rows: number;
  defaultValue: string;
}) => {
  const [field, meta, helpers] = useField(props.name);

  const label = props.name[0].toUpperCase() + props.name.slice(1);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea
        placeholder={label}
        rows={props.rows}
        {...field}
        onChange={(e: any) => {
          helpers.setValue(e.target.value);
        }}
      ></textarea>
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

export default ActivityFormTextarea;
