'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/config';

export default function SignUp() {
    const [error, setError] = useState('');
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters long'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
            if (result.user) {
                router.push('/');
                toast.success('Logged in successfully!');
            }
        } catch (submiterror) {
            setError(submiterror.message);
            toast.error(`Error: ${submiterror}`);
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
                    Sign Up
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
                                Sign Up
                            </Button>
                            <Typography variant="body2" gutterBottom>
                                Already have an account? <Link href="/auth/signin">Sign In</Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
