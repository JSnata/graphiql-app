import { describe, it, expect } from 'vitest';
import createGraphQLSchema from '@/utils/createGraphQLSchema';

describe('createGraphQLSchema', () => {
    it('should return null for empty schema', () => {
        const schema = createGraphQLSchema('');
        expect(schema).toBeNull();
    });
});
