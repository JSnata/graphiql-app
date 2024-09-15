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
import { saveRequestsToLocalStorage } from '@/utils/saveRequestsToLocalStorage';
import { ILsRequestData } from '@/types/lsData';
import { useTranslations } from 'next-intl';
import makeBeautify from '@/utils/makeBautify';
import { useSearchParams } from 'next/navigation';
import { toVariablesArray } from '@/utils/generateRequestBodyWithVars';
import { setResponseBody, setStatusCode, setStatusText } from '@/lib/features/requestSlice';

const ReactGraphqlEditor = dynamic(() => import('@/components/graphqlComponents/ReactGraphqlEditor'), { ssr: false });

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const [docsUrl, setDocsUrl] = useState('');
    const [query, setQuery] = useState('');
    const searchParams = useSearchParams();
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);
    const dispatch = useAppDispatch();
    const t = useTranslations('GraphQL');
    const [errorFormat, setErrorFormat] = useState('');

    const handleSendRequest = async (url: string) => {
        if (!url) {
            toast.warn(t('enterEndpoint'));
            return;
        }
        try {
            const headers = toVariablesArray(searchParams);
            const response = await graphqlSendRequest(url, query, headers, variablesBody);
            dispatch(setStatusCode(response.status));
            dispatch(setResponseBody(response.data));
            dispatch(setStatusText(response.statusText));
            saveRequestsToLocalStorage({
                method: 'GRAPHQL',
                url,
                body: query,
                headers: headers.map((header) => ({ key: header.key, value: header.value })),
            } as ILsRequestData);
            toast(`${t('responseStatus')} ${response.message}`, {
                theme: 'dark',
            });
        } catch (error) {
            dispatch(setStatusText(error.message));
            toast.error(`${t('requestE')} ${error.message}`);
            console.error(error);
        }
    };

    const handleSendIntrospection = async (sdlUrl: string) => {
        if (!sdlUrl) {
            toast.warn(t('enterSDL'));
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
                toast.success(t('requestSchemaS'));
            } else {
                throw new Error('Invalid schema data received');
            }
        } catch (error) {
            console.error(error);
            toast.error(`${t('requestE')} ${error.message}`);
        }
    };

    const handleFormat = async () => {
        const result = await makeBeautify(query, 'graphql');
        setQuery(result.code);
        setErrorFormat(result.error);
    };

    return (
        <Box>
            <Typography variant="h5">GraphQL Client</Typography>
            <RequestBar sendRequest={handleSendRequest} sendIntrospection={handleSendIntrospection} />
            <TabsSection
                labels={[`${t('headers')}`, `${t('variablesBody')}`]}
                elems={[<HttpHeaders key="headersVars" />, <HttpBodyVars key="bodyVars" />]}
            />
            <QueryBar schema={schema} handleChangeQuery={(value) => setQuery(value)}>
                <ReactGraphqlEditor url={docsUrl} />
            </QueryBar>
            <Stack direction="row" sx={{ my: 2, alignItems: 'center' }} spacing={2}>
                <Button variant="contained" onClick={handleFormat}>
                    {t('format')}
                </Button>
                {errorFormat && (
                    <Typography sx={{ color: 'red' }}>
                        {t('error')}: {errorFormat}
                    </Typography>
                )}
            </Stack>
            <HttpResponse />
        </Box>
    );
}
