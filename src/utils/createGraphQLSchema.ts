import { buildClientSchema } from 'graphql/utilities';

export default function createGraphQLSchema(schema: string) {
    if (!schema || schema === '') {
        return null;
    }
    return buildClientSchema(JSON.parse(schema));
}
