import { format } from 'prettier';
import * as babelParser from 'prettier/plugins/babel';
import * as graphqlParser from 'prettier/plugins/graphql';
import * as estree from 'prettier/plugins/estree';

const makeBeautify = async (code: string, type: 'json' | 'graphql') => {
    if (!code) {
        return {
            code: '',
            error: 'Code is empty',
        };
    }
    let result;
    const parser = type === 'json' ? 'json' : 'graphql';
    try {
        // if (code.trim().startsWith('{') && code.trim().endsWith('}')) {
        result = await format(code, {
            parser,
            plugins: [type === 'json' ? babelParser : graphqlParser, estree],
        });
        // }
        return {
            code: result || '',
            error: '',
        };
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                code: '',
                error: err.message,
            };
        }
    }
    return {
        code: '',
        error: 'Invalid code structure',
    };
};
export default makeBeautify;
