/**
 * --- STTB API SERVICE ---
 * Menghubungkan CMS ke Backend ASP.NET Core sesuai dengan 
 * implementasi NewsController dan EventsController di repo.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5176/api";

// --- INTERFACES (Mapped to C# Contracts) ---

export interface NewsDto {
    id: string;
    title: string;
    category: string;
    content: string;
    thumbnailUrl: string;
    createdAt: string;
    authorName: string;
}

export interface NewsDetailResponse extends NewsDto {
    // Properti tambahan untuk detail jika ada
}

export interface GetNewsListResponse {
    news: NewsDto[];
}

export interface EventDto {
    id: string;
    title: string;
    image: string;
    startDate: string;
    time: string;
    location: string;
    price: number;
    description: string;
    endDate?: string;
    isFeatured: boolean;
}

// --- API HELPER ---

const fetcher = async (url: string, options?: RequestInit) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error (${res.status}): ${errorText || res.statusText}`);
    }

    if (res.status === 204) return null;
    return res.json();
};

// --- API MODULES ---

export const api = {
    news: {
        // GET /api/news
        getAll: async (params?: any): Promise<GetNewsListResponse> => {
            const query = params ? `?${new URLSearchParams(params)}` : '';
            return fetcher(`/news${query}`);
        },
        // GET /api/news/{id}
        getById: async (id: string): Promise<NewsDetailResponse> => {
            return fetcher(`/news/${id}`);
        },
        // GET /api/news/latest
        getLatest: async (limit: number = 5): Promise<any> => {
            return fetcher(`/news/latest?limit=${limit}`);
        }
    },

    events: {
        // GET /api/events
        getAll: async (): Promise<EventDto[]> => {
            return fetcher('/events');
        },
        // GET /api/events/featured
        getFeatured: async (): Promise<EventDto[]> => {
            return fetcher('/events/featured');
        },
        // GET /api/events/upcoming
        getUpcoming: async (limit: number = 4): Promise<EventDto[]> => {
            return fetcher(`/events/upcoming?limit=${limit}`);
        },
        // GET /api/events/{id}
        getById: async (id: string): Promise<EventDto> => {
            return fetcher(`/events/${id}`);
        },
        // POST /api/events/{id}/register
        register: async (id: string, payload: any): Promise<string> => {
            return fetcher(`/events/${id}/register`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
        }
    }
};