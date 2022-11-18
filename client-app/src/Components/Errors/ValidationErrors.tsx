import { Message } from "semantic-ui-react";

const ValidationErrors = ({ errors }: { errors: string[] }) => {
  return (
    <>
      <Message>
        {errors && (
          <Message.List>
            {errors.map((err) => (
              <Message.Item key={err}>{err}</Message.Item>
            ))}
          </Message.List>
        )}
      </Message>
    </>
  );
};

export default ValidationErrors;
