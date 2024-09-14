'use client';

import { Box, Typography } from '@mui/material';
import RequestBar from '@/components/graphqlComponents/RequestBar';
import { toast } from 'react-toastify';
import { GraphQLSchema } from 'graphql/type';
import { fetchSchema, fetchSchemaWithIntrospection, graphqlSendRequest } from '@/services/API';
import createGraphQLSchema from '@/utils/createGraphQLSchema';
import QueryBar from '@/components/graphqlComponents/QueryBar';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import HttpHeaders from '@/components/HttpHeaders';
import HttpBodyVars from '@/components/HttpBodyVars';
import TabsSection from '@/components/TabsSection';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import HttpResponse from '@/components/HttpResponse';
import { setResponseBody, setStatusCode, setStatusText } from '@/lib/features/graphqlSlice';

const ReactGraphqlEditor = dynamic(() => import('@/components/graphqlComponents/ReactGraphqlEditor'), { ssr: false });

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const [docsUrl, setDocsUrl] = useState('');
    const [query, setQuery] = useState('');
    const variablesHeader = useAppSelector((state) => state.variables.variablesHeader);
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const dispatch = useAppDispatch();
    // const [query, setQuery] = useState('');
    const handleSendRequest = async (url: string) => {
        if (!url) {
            toast.warn('Please enter URL');
            return;
        }
        // console.log(url, 'url');
        try {
            const response = await graphqlSendRequest(url, query, variablesHeader, variablesBody);
            const statusCode = response.status;
            dispatch(setStatusCode(statusCode));
            // const contentType = response.headers.get('content-type');
            // console.log(response, 'graphql response');
            // console.log(response, 'response');
            // console.log(response);
            // let data;
            // if (contentType && contentType.includes('application/json')) {
            //     data = await response.json();
            // } else {
            //     data = await response.text();
            // }
            dispatch(setResponseBody(response.data));
            toast.success('Request sent successfully');
            // saveRequestsToLocalStorage({
            //     type: 'GRAPHQL',
            //     method: 'GRAPHQL',
            //     url,
            //     body: query,
            //     variablesHeader,
            // } as ILsRequestData);
        } catch (error) {
            dispatch(setStatusText(error.message));
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
            <QueryBar schema={schema} handleChangeQuery={(value) => setQuery(value)}>
                <ReactGraphqlEditor url={docsUrl} />
            </QueryBar>
            <TabsSection
                labels={['Headers', 'Variables Body']}
                elems={[<HttpHeaders key="headersVars" />, <HttpBodyVars key="bodyVars" />]}
            />
            <HttpResponse type="GRAPHQL" />
        </Box>
    );
}
