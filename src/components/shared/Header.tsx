'use client';

import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const router = useRouter();
    const user = false;

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                        REST/GraphQL Client
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
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
                            <MenuItem onClick={() => router.push('/')}>Home</MenuItem>
                            <MenuItem onClick={() => router.push('/restful')}>Restful</MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                        {user ? (
                            <Stack direction={'row'} spacing={2}>
                                <Typography variant={'subtitle1'}>Hi user</Typography>
                                <Button size={'small'} variant={'contained'} color="secondary">
                                    Logout
                                </Button>
                            </Stack>
                        ) : (
                            <Stack direction={'row'} spacing={2}>
                                <Button size={'small'} variant={'contained'} color="secondary">
                                    Login
                                </Button>
                                <Button size={'small'} variant={'contained'} color="secondary">
                                    Register
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
