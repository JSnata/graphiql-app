import { describe, it, expect, vi, Mock } from 'vitest';
import { getIntrospectionQuery } from 'graphql/utilities';
import { fetchSchema, fetchSchemaWithIntrospection } from '@/services/API';

global.fetch = vi.fn();
vi.mock('@/utils/generateRequestBodyWithVars', async () => {
    const originalModule = await vi.importActual('@/utils/generateRequestBodyWithVars');
    return {
        ...originalModule,
        default: vi.fn(() => 'mocked_query'),
    };
});
vi.mock('@/utils/generateHeaders', async () => {
    const originalModule = await vi.importActual('@/utils/generateHeaders');
    return {
        ...originalModule,
        default: vi.fn(() => new Headers({ Authorization: 'Bearer token' })),
    };
});

describe('fetchSchema', () => {
    it('should fetch schema successfully', async () => {
        const mockResponse = { ok: true, json: vi.fn().mockResolvedValue('schema_data') };

        (fetch as unknown as Mock).mockResolvedValue(mockResponse);

        const result = await fetchSchema('http://example.com/sdl');
        expect(result).toBe('schema_data');
        expect(fetch).toHaveBeenCalledWith('http://example.com/sdl', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should throw an error if fetch fails', async () => {
        const mockResponse = { ok: false, status: 404, statusText: 'Not Found' };

        (fetch as unknown as Mock).mockResolvedValue(mockResponse);

        await expect(fetchSchema('http://example.com/sdl')).rejects.toThrow('404Not Found');
    });
});

describe('fetchSchemaWithIntrospection', () => {
    it('should fetch introspection query successfully', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ data: { __schema: 'introspection_data' } }),
        };

        (fetch as unknown as Mock).mockResolvedValue(mockResponse);

        const result = await fetchSchemaWithIntrospection('http://example.com/graphql');
        expect(result).toBe(JSON.stringify({ __schema: 'introspection_data' }, null, 2));
        expect(fetch).toHaveBeenCalledWith('http://example.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: getIntrospectionQuery(),
                operationName: 'IntrospectionQuery',
            }),
        });
    });

    it('should throw an error if fetch fails', async () => {
        const mockResponse = { ok: false, status: 500, statusText: 'Server Error' };

        (fetch as unknown as Mock).mockResolvedValue(mockResponse);

        await expect(fetchSchemaWithIntrospection('http://example.com/graphql')).rejects.toThrow('500 Server Error');
    });
});
