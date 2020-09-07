import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ userName: "", passWord: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
