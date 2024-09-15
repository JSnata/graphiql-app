'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
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
import saveRequestsToLocalStorage from '@/utils/saveRequestsToLocalStorage';
import { ILsRequestData } from '@/types/lsData';
import { useTranslations } from 'next-intl';
import makeBeautify from '@/utils/makeBeautify';
import { useSearchParams } from 'next/navigation';
import { toVariablesArray } from '@/utils/generateRequestBodyWithVars';
import { setQuery, setResponseBody, setStatusCode } from '@/lib/features/requestSlice';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const ReactGraphqlEditor = dynamic(() => import('@/components/graphqlComponents/ReactGraphqlEditor'), { ssr: false });

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const [docsUrl, setDocsUrl] = useState('');
    const searchParams = useSearchParams();
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const { query, sdl } = useAppSelector((state) => state.request);
    const dispatch = useAppDispatch();
    const tGraphql = useTranslations('GraphQL');
    const tRequest = useTranslations('Request');
    const [errorFormat, setErrorFormat] = useState('');

    const handleSendRequest = async (url: string) => {
        if (!url) {
            toast.warn(tRequest('emptyEndpoint'));
            return;
        }
        try {
            const headers = toVariablesArray(searchParams);
            const response = await graphqlSendRequest(url, query, headers, variablesBody);
            dispatch(setStatusCode(response.status));
            dispatch(setResponseBody(response.data));
            saveRequestsToLocalStorage({
                method: 'GRAPHQL',
                url,
                body: query,
                sdl,
                headers,
                variables: variablesBody,
            } as ILsRequestData);
            toast(`${tRequest('status')} ${response.message}`, {
                theme: 'dark',
            });
        } catch (error) {
            toast.error(`${tGraphql('requestE')} ${error.message}`);
        }
    };

    const handleSendIntrospection = async (sdlUrl: string) => {
        if (!sdlUrl) {
            toast.warn(tGraphql('enterSDL'));
            return;
        }
        setDocsUrl(sdlUrl);
        const url = new URL(sdlUrl);

        try {
            let response: string;
            if (url.searchParams.has('sdl')) {
                response = await fetchSchema(url.href);
            } else {
                response = await fetchSchemaWithIntrospection(url.href);
            }

            if (response) {
                const schemaObj = createGraphQLSchema(response);
                setSchema(schemaObj);
                toast.success(tGraphql('requestSchemaS'));
            } else {
                throw new Error('Invalid schema data received');
            }
        } catch (error) {
            toast.error(`${tGraphql('requestE')} ${error.message}`);
        }
    };

    const handleFormat = async () => {
        const result = await makeBeautify(query, 'graphql');
        dispatch(setQuery(result.code));
        setErrorFormat(result.error);
    };

    return (
        <Box>
            <Typography variant="h5">GraphQL Client</Typography>
            <RequestBar sendRequest={handleSendRequest} sendIntrospection={handleSendIntrospection} />
            <TabsSection
                labels={[`${tRequest('headers')}`, `${tRequest('variablesBody')}`]}
                elems={[<HttpHeaders key="headersVars" />, <HttpBodyVars key="bodyVars" />]}
            />
            <QueryBar
                setErrorFormat={setErrorFormat}
                schema={schema}
                handleChangeQuery={(value) => dispatch(setQuery(value))}
            >
                <ReactGraphqlEditor url={docsUrl} />
            </QueryBar>
            <Stack direction="row" sx={{ my: 2, alignItems: 'center' }} spacing={2}>
                <Button variant="contained" onClick={handleFormat}>
                    {tRequest('beautify')}
                    <FormatPaintIcon sx={{ ml: 1.2 }} />
                </Button>
                {errorFormat && (
                    <Typography sx={{ color: 'red' }}>
                        {tRequest('error')}: {errorFormat}
                    </Typography>
                )}
            </Stack>
            <HttpResponse />
        </Box>
    );
}
