'use client';

import { Box, Grid, IconButton } from '@mui/material';
import CodeMirrorGraphqlEditor from '@/components/graphqlComponents/CodeMirrorGraphqlEditor';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';
import { GraphQLSchema } from 'graphql/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { encodeBase64 } from '@/utils/base64';

interface IQueryBarProps {
    schema: GraphQLSchema | null;
    children: React.ReactNode;
    handleChangeQuery: (value: string) => void;
}

export default function QueryBar(props: IQueryBarProps) {
    const { schema, children, handleChangeQuery } = props;
    const [showDocumentation, setShowDocumentation] = useState(false);
    const pathname = usePathname();
    const params = pathname.split('/').filter(Boolean);
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const toggleDocumentation = () => {
        setShowDocumentation((prev) => !prev);
    };

    const setQueryToUrl = (value: string) => {
        replace(`/GRAPHQL/${params[1] || ''}/${encodeBase64(value)}?${searchParams.toString()}`);
    };

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={2}>
                <Grid item xs={showDocumentation ? 5 : 12}>
                    <CodeMirrorGraphqlEditor
                        schema={schema}
                        handleChange={(value) => {
                            if (params.length > 1) setQueryToUrl(value);
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
