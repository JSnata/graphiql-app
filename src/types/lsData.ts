export interface ILsRequestData {
    type: string;
    method: string;
    url: string;
    body: string;
    headers: { [key: string]: string };
    timestamp: string;
}
