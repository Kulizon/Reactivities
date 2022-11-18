import { useField } from "formik";
import { useState } from "react";
import { DatePickerProps } from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import { FormField, Label } from "semantic-ui-react";

const ActivityDateField = (props: DatePickerProps) => {
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props.name!);
  const [touched, setTouched] = useState<boolean>(false);

  console.log(field.value);
  console.log(touched);

  const isError = touched && !field.value;

  return (
    <FormField
      error={isError}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <DateTimePicker
        {...field}
        {...props}
        onCalendarClose={() => setTouched(true)}
        /* @ts-expect-error */
        selected={field.value}
        onChange={(date: Date) => {
          if (date !== field.value) setTouched(true);

          helpers.setValue(date);
        }}
        name={props.name}
      ></DateTimePicker>
      {isError && (
        <Label
          basic
          color="red"
          content={"The activity date is required"}
          style={{ marginTop: "5px" }}
        ></Label>
      )}
    </FormField>
  );
};

export default ActivityDateField;
