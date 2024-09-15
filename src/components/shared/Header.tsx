'use client';

import {
    AppBar,
    Box,
    Button,
    Divider,
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
import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface IScrollProps {
    children: React.ReactElement;
}

function AnimatedScroll(props: IScrollProps) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 1,
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
    const t = useTranslations('Auth');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const getName = () => {
        if (!user) {
            return null;
        }
        return (user.email ?? 'unknown').split('@')[0];
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }} component="header">
            <AnimatedScroll>
                <AppBar component="nav" position="fixed">
                    <Toolbar>
                        <Link style={{ display: 'flex', alignItems: 'center' }} href="/">
                            <Image
                                src="./graph.svg"
                                alt="Background"
                                width={40}
                                height={40}
                                style={{ marginRight: '10px' }}
                            />
                            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                                REST/GraphQL Client
                            </Typography>
                        </Link>

                        {/* mobile menu */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', sm: 'none' },
                                justifyContent: 'flex-end',
                            }}
                        >
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
                                          <MenuItem key="userWelcome" disableTouchRipple>
                                              <Typography variant="subtitle1">
                                                  {t('userWelcome')} {getName()}
                                              </Typography>
                                          </MenuItem>,
                                          <Divider key="divider" />,
                                          <MenuItem key="logout" onClick={handleLogout}>
                                              {t('logout')}
                                          </MenuItem>,
                                          <MenuItem key="localeSwitcher">
                                              <LocaleSwitcher />
                                          </MenuItem>,
                                      ]
                                    : [
                                          <MenuItem key="login" onClick={() => router.push('/signin')}>
                                              {t('signin')}
                                          </MenuItem>,
                                          <MenuItem key="register" onClick={() => router.push('/signup')}>
                                              {t('signup')}
                                          </MenuItem>,
                                          <MenuItem key="localeSwitcher">
                                              <LocaleSwitcher />
                                          </MenuItem>,
                                      ]}
                            </Menu>
                        </Box>
                        {/* desktop menu */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', sm: 'flex' },
                                justifyContent: 'flex-end',
                            }}
                        >
                            {user ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LocaleSwitcher />
                                    <Typography variant="subtitle1">
                                        {t('userWelcome')} {getName()}
                                    </Typography>
                                    <Button size="small" variant="contained" color="secondary" onClick={handleLogout}>
                                        {t('logout')}
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack direction="row" spacing={2}>
                                    <LocaleSwitcher />
                                    <Link href="/signin">
                                        <Button size="small" variant="contained" color="secondary">
                                            {t('signin')}
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button size="small" variant="contained" color="secondary">
                                            {t('signup')}
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
