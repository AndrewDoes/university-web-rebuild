/**
 * --- STTB API SERVICE ---
 * Layer ini menghubungkan frontend CMS ke Backend ASP.NET Core (C#).
 * Pastikan backend Anda berjalan (biasanya di port 7001 atau 5001).
 */

const BASE_URL = "https://localhost:7001/api"; // Sesuaikan dengan port backend C# Anda

export interface NewsDto {
    id: string; // GUID dari C#
    title: string;
    category: string;
    content: string;
    thumbnailUrl: string;
    createdAt: string;
    authorName: string;
}

export interface GetNewsListResponse {
    news: NewsDto[];
}

export const newsApi = {
    // GET ALL NEWS
    getAll: async (): Promise<NewsDto[]> => {
        try {
            const res = await fetch(`${BASE_URL}/News`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("Gagal mengambil data dari server C#");
            const data: GetNewsListResponse = await res.json();
            return data.news;
        } catch (err) {
            console.error("API Error:", err);
            throw err;
        }
    },


};