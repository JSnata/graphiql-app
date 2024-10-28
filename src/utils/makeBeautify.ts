import { format } from 'prettier';
import * as babelParser from 'prettier/plugins/babel';
import * as graphqlParser from 'prettier/plugins/graphql';
import * as estree from 'prettier/plugins/estree';

const makeBeautify = async (code: string, parser: 'json' | 'graphql') => {
    if (!code) {
        return {
            code,
            error: 'Code is empty',
        };
    }

    if (parser === 'json' && (!code.trim().startsWith('{') || !code.trim().endsWith('}'))) {
        return {
            code,
            error: '',
        };
    }

    let result: string;
    try {
        result = await format(code, {
            parser,
            plugins: [parser === 'json' ? babelParser : graphqlParser, estree],
        });
        return {
            code: result,
            error: '',
        };
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                code,
                error: err.message,
            };
        }
    }

    return {
        code,
        error: 'Invalid code structure',
    };
};

export default makeBeautify;
