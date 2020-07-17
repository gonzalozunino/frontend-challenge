import * as yup from "yup";

const validationSchemaStep1 = yup.object({
  name: yup.string().required("First Name is required").max(20),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const validationSchemaStep2 = yup.object({
  terms: yup
    .boolean()
    .oneOf([true], "Must Accept Terms and Conditions to continue"),
  color: yup.string().required("A color is required"),
});
const schemaArray = [validationSchemaStep1, validationSchemaStep2];

export { schemaArray };
