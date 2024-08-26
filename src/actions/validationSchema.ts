import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/(?=.*[0-9])/, 'Password should contain at least one number')
        .matches(/(?=.*[A-Za-z])/, 'Password should contain at least one letter')
        .matches(/(?=.*[\p{L}\p{N}\p{S}\p{P}\p{Z}\p{M}])/u, 'Password should contain valid Unicode characters')
        .matches(/(?=.*[!@#$%^&*])/, 'Password should contain at least one special character'),
});

export default validationSchema;
