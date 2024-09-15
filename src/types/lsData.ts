import { Variable } from '@/lib/features/variablesSlice';

export interface ILsRequestData {
    method: string;
    url: string;
    body: string;
    headers: Array<Variable>;
    timestamp?: string;
}
