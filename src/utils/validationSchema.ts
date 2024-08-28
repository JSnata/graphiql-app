import * as Yup from 'yup';

// const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string()
//         .required('Required')
//         .min(8, 'Password must be at least 8 characters long')
//         .matches(/(?=.*[0-9])/, 'Password should contain at least one number')
//         .matches(/(?=.*[A-Za-z])/, 'Password should contain at least one letter')
//         .matches(/(?=.*[\p{L}\p{N}\p{S}\p{P}\p{Z}\p{M}])/u, 'Password should contain valid Unicode characters')
//         .matches(/(?=.*[!@#$%^&*])/, 'Password should contain at least one special character'),
// });
//
// export default validationSchema;

// type TFunction = typeof t from useTranslations;
export type TranslationFunction = (key: string, options?: object) => string;
const createValidationSchema = (t: TranslationFunction) => {
    return Yup.object({
        email: Yup.string().email(t('Validation.invalidEmail')).required(t('Validation.required')),
        password: Yup.string()
            .required(t('Validation.required'))
            .min(8, t('Validation.passwordMin'))
            .matches(/(?=.*[0-9])/, t('Validation.passwordNumber'))
            .matches(/(?=.*[A-Za-z])/, t('Validation.passwordLetter'))
            .matches(/(?=.*[\p{L}\p{N}\p{S}\p{P}\p{Z}\p{M}])/u, t('Validation.passwordUnicode'))
            .matches(/(?=.*[!@#$%^&*])/, t('Validation.passwordSpecialChar')),
    });
};
export default createValidationSchema;
