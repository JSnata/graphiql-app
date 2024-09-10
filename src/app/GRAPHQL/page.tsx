// @ts-ignore

'use client';

import { Box, Typography } from '@mui/material';
// import dynamic from 'next/dynamic';
import RequestBar from '@/components/graphqlComponents/RequestBar';
import GraphQLEditor from '@/components/graphqlComponents/GraphQLEditor';
import { GraphQLSchema } from 'graphql/type';
import { useState } from 'react';
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';

// этот импорт пока не нужен
// const DynamicGraphiQL = dynamic(() => import('@/components/graphqlComponents/GraphiQL'), { ssr: false });

// это строка запроса схемы graphQL, но была заменена на getIntrospectionQuery() функцию. Пока не используется
// const introspectionQuery = `
//   query IntrospectionQuery {
//     __schema {
//       types {
//         ...FullType
//       }
//     }
//   }
//
//   fragment FullType on __Type {
//     kind
//     name
//     fields(includeDeprecated: true) {
//       name
//       args {
//         name
//         type {
//           ...TypeRef
//         }
//       }
//       type {
//         ...TypeRef
//       }
//       isDeprecated
//       deprecationReason
//     }
//     inputFields {
//       name
//       type {
//         ...TypeRef
//       }
//     }
//     interfaces {
//       name
//     }
//     enumValues(includeDeprecated: true) {
//       name
//       isDeprecated
//       deprecationReason
//     }
//     possibleTypes {
//       name
//     }
//   }
//
//   fragment TypeRef on __Type {
//     kind
//     name
//     ofType {
//       kind
//       name
//       ofType {
//         kind
//         name
//         ofType {
//           kind
//           name
//         }
//       }
//     }
//   }
// `;

// запрос для получения схемы
const fetchSchema = async (url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: getIntrospectionQuery(),
        }),
    });

    const result = await response.json();
    // console.log(result, 'RESPONSE with schema');
    return result;
};

export default function GraphqlPage() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);
    const handleSendRequest = async (url: string, sdlUrl: string) => {
        // console.log(url, sdlUrl, 'url and sdlUrl');
        if (!url || !sdlUrl) return;
        try {
            const response = await fetchSchema(sdlUrl);
            if (response) {
                // тут схема билдится
                const schemaObj = buildClientSchema(response.data);
                setSchema(schemaObj);
                // console.log(schemaObj, 'GRAPHQL SCHEMA');
            } else {
                throw new Error('Invalid schema data received');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography variant="h5">GraphQL Client</Typography>
            <RequestBar sendRequestFunc={handleSendRequest} />
            <GraphQLEditor schema={schema} />
            {/* <DynamicGraphiQL /> */}
        </Box>
    );
}
