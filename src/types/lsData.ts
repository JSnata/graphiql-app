export interface ILsRequestData {
    type: string;
    method: string;
    url: string;
    body: string;
    headers: Array<{ [key: string]: string }>;
    timestamp?: string;
}
