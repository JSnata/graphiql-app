import * as Yup from 'yup';

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
