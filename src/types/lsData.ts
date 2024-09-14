import { Variable } from '@/lib/features/variablesSlice';

export interface ILsRequestData {
    type: string;
    method: string;
    url: string;
    body: string;
    headers: Array<Variable>;
    variables: Variable[];
    timestamp: string;
}
