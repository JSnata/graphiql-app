'use server';

import { getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';

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

export const graphqlFetch = async (url: string, query: string) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
        }),
    });
};
