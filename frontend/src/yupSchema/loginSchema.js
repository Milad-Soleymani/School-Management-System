import * as yup from 'yup';

export const registerSchema = yup.object({
    email: yup.string().email("It must be an Email.").required("Email is required."),
    password: yup.string().min(8, "Password must contain 8 chracters.").required("Password is a required field."),

})