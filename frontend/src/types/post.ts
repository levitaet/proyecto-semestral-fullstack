export interface Post {
    id: string;
    title: string;
    price: string;
    product_id: string;
    author_id: string;
    createdAt: string;
    updatedAt: string;
    tag: string;
    location: string;
    availability: boolean;
    stock: number | null;
    image: string;
}

export interface Tag {
    id: string
    name: string
}