import { ErrorMessage, useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

const ActivityFormDropdown = (props: { name: string; options: any }) => {
  const [field, meta, helpers] = useField(props.name);

  const label = props.name[0].toUpperCase() + props.name.slice(1);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        options={props.options}
        value={field.value || null}
        clearable
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true, true)}
      ></Select>
      {meta.touched && !!meta.error && (
        <ErrorMessage
          name={props.name}
          render={(error) => <Label basic color="red" content={error}></Label>}
        ></ErrorMessage>
      )}
    </FormField>
  );
};

export default ActivityFormDropdown;
