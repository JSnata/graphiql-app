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
import { saveRequestsToLocalStorage } from '@/utils/saveRequestsToLocalStorage';
import { ILsRequestData } from '@/types/lsData';

const ReactGraphqlEditor = dynamic(() => import('@/components/graphqlComponents/ReactGraphqlEditor'), { ssr: false });

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const [docsUrl, setDocsUrl] = useState('');
    const [query, setQuery] = useState('');
    const variablesHeader = useAppSelector((state) => state.variables.variablesHeader);
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const dispatch = useAppDispatch();
    const handleSendRequest = async (url: string) => {
        if (!url) {
            toast.warn('Please enter URL');
            return;
        }
        try {
            const response = await graphqlSendRequest(url, query, variablesHeader, variablesBody);
            dispatch(setStatusCode(response.status));
            dispatch(setResponseBody(response.data));
            dispatch(setStatusText(response.statusText));
            saveRequestsToLocalStorage({
                type: 'GRAPHQL',
                method: 'GRAPHQL',
                url,
                body: query,
                headers: variablesHeader.map((header) => ({ key: header.key, value: header.value })),
            } as ILsRequestData);
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
