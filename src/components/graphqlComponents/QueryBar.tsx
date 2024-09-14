'use client';

import { Box, Grid, IconButton } from '@mui/material';
import CodeMirrorGraphqlEditor from '@/components/graphqlComponents/CodeMirrorGraphqlEditor';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';
import { GraphQLSchema } from 'graphql/type';
import { usePathname } from 'next/navigation';

interface IQueryBarProps {
    schema: GraphQLSchema | null;
    children: React.ReactNode;
    handleChangeQuery: (value: string) => void;
}

export default function QueryBar(props: IQueryBarProps) {
    const { schema, children, handleChangeQuery } = props;
    const [showDocumentation, setShowDocumentation] = useState(false);
    const pathName = usePathname();
    const toggleDocumentation = () => {
        setShowDocumentation((prev) => !prev);
    };

    const setQueryToUrl = (query: string) => {
        if (query) {
            const pathSegments = pathName.split('/');
            let encodedEndpoint;

            if (pathSegments.length > 2 && pathSegments[2]) {
                [, , encodedEndpoint] = pathSegments;
            } else {
                const endpoint = '';
                encodedEndpoint = btoa(endpoint);
            }

            const encodedQuery = btoa(query);
            const newUrl = `${pathSegments[1] ? `/${pathSegments[1]}` : ''}/${encodedEndpoint}/${encodedQuery}`;
            window.history.replaceState(null, '', newUrl);
        }
    };

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={2}>
                <Grid item xs={showDocumentation ? 5 : 12}>
                    <CodeMirrorGraphqlEditor
                        schema={schema}
                        handleChange={(value) => {
                            setQueryToUrl(value);
                            handleChangeQuery(value);
                        }}
                    />
                </Grid>

                {showDocumentation && (
                    <Grid item xs={7}>
                        <Box sx={{ height: '400px', overflow: 'scroll', p: 2, border: '1px solid lightgray' }}>
                            {children}
                        </Box>
                    </Grid>
                )}
            </Grid>

            <Box>
                <IconButton aria-label="open-doc" onClick={toggleDocumentation}>
                    <DescriptionIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
