import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("values", values);
    if (values.username === "root" && values.password === "root") {
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="ui form">
            <Grid.Row className="field">
              <label>Username</label>
              <Field type="text" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                className="ui red message"
              />
            </Grid.Row>

            <Grid.Row className="field">
              <label>Password</label>
              <Field type="text" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="ui red message"
              />
            </Grid.Row>
            <Grid.Row className="buttonField">
              <Button
                type="submit"
                primary
                floated={"right"}
                className="submitButton"
              >
                Login
              </Button>
            </Grid.Row>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
