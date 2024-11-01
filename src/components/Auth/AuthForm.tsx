'use client';

import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import createValidationSchema from '@/utils/validationSchema';

interface AuthFormProps {
    handleSubmit: (values: { email: string; password: string }) => Promise<void>;
    buttonText: string;
    linkText: string;
    linkHref: string;
    error: string;
}

export default function AuthForm({ handleSubmit, buttonText, linkText, linkHref, error }: AuthFormProps) {
    const t = useTranslations();
    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = createValidationSchema(t);

    return (
        <Box
            sx={{
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#fff',
                width: '400px',
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom align="center">
                {buttonText}
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <Box sx={{ mb: 3 }}>
                            <Field
                                as={TextField}
                                label={t('Auth.email')}
                                name="email"
                                type="email"
                                fullWidth
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <Field
                                as={TextField}
                                label={t('Auth.password')}
                                name="password"
                                type="password"
                                fullWidth
                                autoComplete="on"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Box>
                        {error && (
                            <Typography color="error" variant="body2" gutterBottom>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {buttonText}
                        </Button>
                        <Typography variant="body2" gutterBottom mt={2}>
                            {linkText}{' '}
                            <Link href={linkHref}>
                                {buttonText === t('Auth.signin') ? t('Auth.signup') : t('Auth.signin')}
                            </Link>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
