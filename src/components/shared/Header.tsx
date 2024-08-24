'use client';

import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();
    const user = true; // Заглушка под авторизацию

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {}; // Заглушка под выход

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Image
                        src={'./graph.svg'}
                        alt={'Background'}
                        width={40}
                        height={40}
                        style={{ marginRight: '10px' }}
                    />
                    <Link href={'/'}>
                        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                            REST/GraphQL Client
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {user ? (
                                <>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => router.push('/login')}>Login</MenuItem>
                                    <MenuItem onClick={() => router.push('/register')}>Register</MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                        {user ? (
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Typography variant={'subtitle1'}>Hi user</Typography>
                                <Button size={'small'} variant={'contained'} color="secondary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Stack>
                        ) : (
                            <Stack direction={'row'} spacing={2}>
                                <Link href={'/login'}>
                                    <Button size={'small'} variant={'contained'} color="secondary">
                                        Login
                                    </Button>
                                </Link>
                                <Link href={'/register'}>
                                    <Button size={'small'} variant={'contained'} color="secondary">
                                        Register
                                    </Button>
                                </Link>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
