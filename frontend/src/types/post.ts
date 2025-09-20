export interface Post {
    id: number
    product_name: string
    price: string // más flexible para cosas como "desde $5000"
    stock: number | null // un servicio no tiene stock
    tag: string
    description: string
    location: string
    image: string // dirección de la imagen
    post_author: string
    availability: boolean // producto disponible
}