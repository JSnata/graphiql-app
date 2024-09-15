import { ILsRequestData } from '@/types/lsData';

export default function saveRequestsToLocalStorage(requestData: ILsRequestData) {
    if (typeof window !== 'undefined') {
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.push({
            ...requestData,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem('requests', JSON.stringify(requests));
    }
}
