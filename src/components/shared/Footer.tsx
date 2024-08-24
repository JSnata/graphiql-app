import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'primary.main',
                padding: '1rem',
                color: 'white',
            }}
            component={'footer'}
        >
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Grid container direction="row" alignItems={'center'} spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <Grid container direction={'row'} spacing={1} justifyContent={'center'}>
                            <Grid item sm={12} md={4}>
                                <Link href={'https://github.com/linderjk'} target={'_blank'}>
                                    LinderJK
                                </Link>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <Link href={'https://github.com/jsnata'} target={'_blank'}>
                                    JSNata
                                </Link>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <Link href={'https://github.com/dialecticallaw'} target={'_blank'}>
                                    DialecticalLaw
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body1">{`${new Date().getFullYear()}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Link href={`https://rs.school/courses/reactjs`} target={'_blank'}>
                            <Image src={'/rss-logo.svg'} alt={'logoRss'} width={30} height={30} />
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
