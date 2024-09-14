'use server';

import { getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import generateRequestBodyWithVars, { generateHeaders } from '@/utils/generateRequestBodyWithVars';

export const fetchSchema = async (sdlUrl: string) => {
    const response = await fetch(sdlUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`${response.status + response.statusText}`);
    }
    const result = await response.json();
    return result;
};

export const fetchSchemaWithIntrospection = async (sdlUrl: string) => {
    const response = await fetch(sdlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: getIntrospectionQuery(),
            operationName: 'IntrospectionQuery',
        }),
    });
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const introspectionData = result && (result.data as unknown as IntrospectionQuery);
    return JSON.stringify(introspectionData, null, 2);
};

export const graphqlSendRequest = async (
    url: string,
    query: string,
    variables: { [key: string]: string }[],
    headers: {
        [key: string]: string;
    }[],
) => {
    const requestOptions: RequestInit = { method: 'POST' };
    requestOptions.body = JSON.stringify({
        query: generateRequestBodyWithVars(query, variables, false),
    });
    const generatedHeaders = generateHeaders(headers);
    generatedHeaders.set('Content-Type', 'application/json');
    requestOptions.headers = generatedHeaders;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    return {
        status: response.status,
        data,
    };
};
