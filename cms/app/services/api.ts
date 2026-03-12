/**
 * --- STTB FRONTEND API SERVICE ---
 * Internal System API Handlers for CMS (ASP.NET Core Backend)
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5176/api";

// --- INTERFACES ---

export interface NewsDto {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    publishedAt: string;
    category?: string;
    author?: string;
    status?: string;
    tags?: string;
    slug?: string;
}

export interface NewsDetailDto extends NewsDto {
    content: string;
}

export interface GetNewsListResponse {
    news: NewsDto[];
}

export interface EventDto {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    startDate: string;
    endDate?: string;
    time: string;
    location: string;
    speakers: string;
    agenda: string;
    price: string;
    isFeatured: boolean;
    status: string;
    maxParticipants?: number;
    registrationDeadline?: string;
    createdAt: string;
}

export interface TestimonialDto {
    id: string;
    name: string;
    degree: string;
    photo: string;
    quote: string;
    position: string;
    isFeatured: boolean;
}

export interface LecturerDto {
    id: string;
    name: string;
    position: string;
    description?: string;
    photo?: string;
    createdAt: string;
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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Fetch Error: ${response.status} - ${errorText || response.statusText}`);
        }

        if (response.status === 204) return {} as T;
        return await response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
}

// --- API EXPORT ---

export const api = {
    news: {
        getAll: () => apiRequest<GetNewsListResponse>('/news'),
        getById: (id: string) => apiRequest<NewsDetailDto>(`/news/${id}`),
        create: (data: Partial<NewsDetailDto>) => apiRequest<NewsDto>('/news', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id: string, data: Partial<NewsDetailDto>) => apiRequest<NewsDto>(`/news/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id: string) => apiRequest<{ success: boolean; message: string }>(`/news/${id}`, {
            method: 'DELETE'
        }),
    },
    events: {
        getAll: () => apiRequest<EventDto[]>('/events'),
        getUpcoming: (limit: number = 4) => apiRequest<EventDto[]>(`/events/upcoming?limit=${limit}`),
        getById: (id: string) => apiRequest<EventDto>(`/events/${id}`),
        create: (data: Partial<EventDto>) => apiRequest<EventDto>('/events', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id: string, data: Partial<EventDto>) => apiRequest<EventDto>(`/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id: string) => apiRequest<{ success: boolean; message: string }>(`/events/${id}`, {
            method: 'DELETE'
        }),
    },
    testimonials: {
        getAll: () => apiRequest<TestimonialDto[]>('/testimonials'),
        create: (data: Partial<TestimonialDto>) => apiRequest<TestimonialDto>('/testimonials', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id: string, data: Partial<TestimonialDto>) => apiRequest<TestimonialDto>(`/testimonials/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id: string) => apiRequest<{ success: boolean; message: string }>(`/testimonials/${id}`, {
            method: 'DELETE'
        }),
    },
    lecturers: {
        getAll: () => apiRequest<LecturerDto[]>('/lecturers'),
        getById: (id: string) => apiRequest<LecturerDto>(`/lecturers/${id}`),
        create: (data: Partial<LecturerDto>) => apiRequest<LecturerDto>('/lecturers', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        update: (id: string, data: Partial<LecturerDto>) => apiRequest<LecturerDto>(`/lecturers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        delete: (id: string) => apiRequest<{ success: boolean; message: string }>(`/lecturers/${id}`, {
            method: 'DELETE'
        }),
    }
};