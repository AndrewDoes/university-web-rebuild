/**
 * --- STTB FRONTEND API SERVICE ---
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- INTERFACES ---

export interface NewsDto {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    publishedAt: string;
    category?: NewsCategoryDto;
    categoryId?: string;
    slug?: string;
}

export interface NewsCategoryDto {
    id: string;
    name: string;
    slug: string;
}

export interface NewsDetailDto extends NewsDto {
    content: string; // Maps to ContentBody in your DB
    author?: string;
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
    isFeatured: boolean;
}

export interface TestimonialDto {
    id: string;
    name: string;
    degree: string;
    photo: string;
    quote: string;
    position: string;
}

export interface LecturerDto {
    id: string;
    name: string;
    position: string;
    description: string;
    photo: string;
}

// --- REQUEST HANDLER ---

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
        if (!response.ok) throw new Error(`Fetch Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
}

// --- API EXPORT ---

export const api = {
    news: {
        // GET: get all news
        getAll: () => apiRequest<GetNewsListResponse>('/news'),

        // GET: get latest news
        getLatest: (limit: number = 3) => apiRequest<GetNewsListResponse>(`/news/latest?limit=${limit}`),

        // GET: get news detail
        getById: (id: string) => apiRequest<NewsDetailDto>(`/news/${id}`),
    },
    events: {
        // GET: get all events
        getAll: () => apiRequest<EventDto[]>('/events'),

        // GET: get upcoming events
        getUpcoming: (limit: number = 4) => apiRequest<EventDto[]>(`/events/upcoming?limit=${limit}`),

        // GET: get event detail
        getById: (id: string) => apiRequest<EventDto>(`/events/${id}`),
    },
    testimonials: {
        // GET: get all testimonials
        getAll: () => apiRequest<TestimonialDto[]>('/testimonials'),
    },
    lecturers: {
        // GET: get all lecturers
        getAll: () => apiRequest<LecturerDto[]>('/lecturers'),
        
        // GET: get lecturer detail
        getById: (id: string) => apiRequest<LecturerDto>(`/lecturers/${id}`),
    }
};