'use client';

import { Box, Typography } from '@mui/material';
import RequestBar from '@/components/graphqlComponents/RequestBar';
import { toast } from 'react-toastify';
import { GraphQLSchema } from 'graphql/type';
import { fetchSchema, fetchSchemaWithIntrospection } from '@/services/API';
import createGraphQLSchema from '@/utils/createGraphQLSchema';
import QueryBar from '@/components/graphqlComponents/QueryBar';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactGraphqlEditor = dynamic(() => import('@/components/graphqlComponents/ReactGraphqlEditor'), { ssr: false });

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const [docsUrl, setDocsUrl] = useState('');
    // const [query, setQuery] = useState('');
    const handleSendRequest = async (url: string) => {
        if (!url) {
            toast.warn('Please enter URL');
            return;
        }

        try {
            // console.log(query, 'my query');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendIntrospection = async (sdlUrl: string) => {
        // console.log(sdlUrl, 'sdlUrl');
        if (!sdlUrl) {
            toast.warn('Please enter SDL URL');
            return;
        }
        setDocsUrl(sdlUrl);
        const url = new URL(sdlUrl);

        try {
            let response;
            if (url.searchParams.has('sdl')) {
                // console.log(url, 'URL with SDL!!');
                response = await fetchSchema(url.href);
            } else {
                // console.log(url, 'URL with Introspection without sdl!!');
                response = await fetchSchemaWithIntrospection(url.href);
            }

            if (response) {
                const schemaObj = createGraphQLSchema(response);
                setSchema(schemaObj);
            } else {
                throw new Error('Invalid schema data received');
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to fetch schema ${error.message}`);
        }
    };

    return (
        <Box>
            <Typography variant="h5">GraphQL Client</Typography>
            <RequestBar sendRequest={handleSendRequest} sendIntrospection={handleSendIntrospection} />
            <QueryBar schema={schema}>
                <ReactGraphqlEditor url={docsUrl} />
            </QueryBar>
        </Box>
    );
}
