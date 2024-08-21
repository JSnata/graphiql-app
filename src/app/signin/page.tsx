'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

export default function SignIn() {
    const [error, setError] = useState('');
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result?.error) {
            setError(result.error);
            toast.error(`Error: ${result.error}`);
        } else {
            toast.success('Logged in successfully!');
            router.push('/');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
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
                    Login
                </Typography>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched }) => (
                        <Form>
                            <Box sx={{ mb: 3 }}>
                                <Field
                                    as={TextField}
                                    label="Email"
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
                                    label="Password"
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
                                Login
                            </Button>
                            <Typography variant="body2" gutterBottom>
                                Do not have an account? <Link href="/signup">Sign Up</Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
