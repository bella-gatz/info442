import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth, db } from './firebase'; // Ensure you have your Firebase initialized here
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the useAuthState hook
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
import SignIn from './SignIn';

function Profile() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [receiveUpdates, setReceiveUpdates] = useState(false);

    // Use the useAuthState hook to get the current user state
    const [user] = useAuthState(auth);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            // Save additional user info to Firestore
            await setDoc(doc(db, 'users', newUser.uid), {
                userName,
                email,
                receiveUpdates,
                createdAt: new Date(),
            });

            alert('User created successfully');
        } catch (error) {
            console.error('Error signing up:', error);
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('User logged out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
            alert(error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                {user ? (
                    <>
                        <Typography component="h1" variant="h5">
                            Welcome, {user.displayName || 'User'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Email: {user.email}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Receive Updates: {receiveUpdates ? 'Yes' : 'No'}
                        </Typography>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={receiveUpdates}
                                                onChange={(e) => setReceiveUpdates(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="I want to receive updates about SMG via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <RouterLink to="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </RouterLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default Profile;
