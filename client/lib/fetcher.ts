/**
 * Centralized fetcher for API requests with consistent error handling.
 */

interface FetchOptions extends RequestInit {
    revalidate?: number;
}

export const baseFetcher = async <T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { revalidate = 0, ...init } = options;
    const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_APP_API_URL is not defined");
    }

    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${cleanBaseUrl}${cleanEndpoint}`;

    try {
        const response = await fetch(url, {
            ...init,
            next: { revalidate },
            headers: {
                "Content-Type": "application/json",
                ...init.headers,
            },
        });

        if (!response.ok) {
            // Attempt to parse error message from body if available
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData?.message) {
                    errorMessage = errorData.message;
                }
            } catch {
                // Ignore parse error
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`[Fetch Error] ${url}:`, error.message);
            throw error;
        }
        throw new Error("An unknown error occurred during fetch");
    }
};
