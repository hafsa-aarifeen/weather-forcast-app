import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "semantic-ui-react";

import "./SearchForm.css";

const SearchForm = ({ setLat, setLong }) => {
  const handleSubmit = (values) => {
    setLat(values.latitude);
    setLong(values.longitude);
  };

  return (
    <div className="search-form">
      <Formik
        initialValues={{ latitude: "", longitude: "" }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.latitude) {
            errors.latitude = "Latitude is required";
          }

          if (!values.longitude) {
            errors.longitude = "Longitude is required";
          }

          return errors;
        }}
      >
        <Form className="ui form">
          <div className="field">
            <label>Latitude</label>
            <Field type="text" name="latitude" />
            <ErrorMessage
              name="latitude"
              component="div"
              className="ui red message"
            />
          </div>

          <div className="field">
            <label>Longitude</label>
            <Field type="text" name="longitude" />
            <ErrorMessage
              name="longitude"
              component="div"
              className="ui red message"
            />
          </div>

          <Button type="submit" primary floated="right">
            Search
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
