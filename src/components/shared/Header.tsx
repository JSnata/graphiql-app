'use client';

import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    styled,
    Toolbar,
    Typography,
    useScrollTrigger,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

interface IScrollProps {
    children: React.ReactElement;
}

function AnimatedScroll(props: IScrollProps) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        style: {
            transition: 'background-color 0.3s ease, height 0.3s ease',
            backgroundColor: trigger ? '#3c5e79' : '#1976d2',
        },
    });
}

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

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
        <Box sx={{ flexGrow: 1 }} component={'header'}>
            <AnimatedScroll>
                <AppBar component={'nav'} position={'fixed'}>
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
                                {user
                                    ? [
                                          <MenuItem key="logout" onClick={handleLogout}>
                                              Logout
                                          </MenuItem>,
                                      ]
                                    : [
                                          <MenuItem key="login" onClick={() => router.push('/login')}>
                                              Login
                                          </MenuItem>,
                                          <MenuItem key="register" onClick={() => router.push('/register')}>
                                              Register
                                          </MenuItem>,
                                      ]}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                            {user ? (
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Typography variant={'subtitle1'}>Hi user</Typography>
                                    <Button
                                        size={'small'}
                                        variant={'contained'}
                                        color="secondary"
                                        onClick={handleLogout}
                                    >
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
            </AnimatedScroll>
            <Offset />
        </Box>
    );
}