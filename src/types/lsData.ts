import { Variable } from '@/lib/features/variablesSlice';

export interface ILsRequestData {
    method: 'GRAPHQL' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
    url: string;
    body: string;
    headers: Array<Variable>;
    variables: Variable[];
    timestamp: string;
    sdl?: string;
}
