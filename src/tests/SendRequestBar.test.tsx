import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, Mock } from 'vitest';
import SendRequestBar from '@/components/SendRequestBar';
import { setResponseBody, setStatusCode } from '@/lib/features/requestSlice';
import { useAppDispatch } from '@/lib/hook';
import { renderWithProviders } from './testWithStore/renderWithProviders';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: vi.fn(),
    }),
    useParams: () => ({
        request: ['GET', 'encoded-url'],
    }),
    usePathname: () => '/GET/encoded-url',
    useSearchParams: () => new URLSearchParams('?param1=value1'),
}));

vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: { fontFamily: 'Roboto' },
    }),
}));

vi.mock('@/utils/base64', () => ({
    encodeBase64: vi.fn(),
    decodeBase64: vi.fn().mockReturnValue('https://mocked-url.com'),
}));

vi.mock('@/lib/hook', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn().mockReturnValue([{ key: 'param1', value: 'value1' }]),
}));

describe('SendRequestBar Component', () => {
    const mockDispatch = vi.fn();
    global.fetch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (global.fetch as Mock).mockClear();
        (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    });

    it('renders correctly and displays the "Send" button', () => {
        renderWithProviders(<SendRequestBar />);
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    it('sends a successful request and dispatches the response', async () => {
        const mockResponse = { data: 'response data' };

        (global.fetch as Mock).mockResolvedValueOnce({
            status: 200,
            headers: { get: () => 'application/json' },
            json: () => Promise.resolve(mockResponse),
        });

        await renderWithProviders(<SendRequestBar />);

        fireEvent.click(screen.getByText('Send'));

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(setStatusCode(200));
            expect(mockDispatch).toHaveBeenCalledWith(setResponseBody(mockResponse));
        });
    });
});
