export interface Post {
    id: string;
    title: string;
    product_name: string;
    description: string;
    price: number;
    author_name: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    category: string;
    location: string;
    availability: boolean;
    stock: number | null;
    image: string;
}