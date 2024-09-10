import { ILsRequestData } from '@/types/lsData';

export function saveRequestsToLocalStorage(requestData: ILsRequestData) {
    if (typeof window !== 'undefined') {
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.push({
            ...requestData,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem('requests', JSON.stringify(requests));
    }
}

export function getSortedRequests(): ILsRequestData[] | null {
    if (typeof window !== 'undefined') {
        const requests: ILsRequestData[] = JSON.parse(localStorage.getItem('requests')) || [];
        return requests.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return null;
}
