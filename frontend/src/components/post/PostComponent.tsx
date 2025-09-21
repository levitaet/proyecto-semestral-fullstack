import "./PostComponent.css";

interface PostComponentProps {
  product_name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  location: string;
  availability: boolean;
  stock: number | null;
  post_author: string;
  id: number;
}

const PostComponent = ({
  product_name,
  description,
  price,
  image,
  tag,
  location,
  availability,
  stock,
  post_author,
}: PostComponentProps) => {
  return (
    <article className="post-card">
      <div className="post-card_image-wrap">
        <img className="post-card_image" src={image} alt={product_name} />

        <span className="post-card_tag">{tag}</span>

        <span
          className={`post-card_status ${
            availability ? "is-available" : "is-unavailable"
          }`}
        >
          <span className="status-dot"/>
          En la U
        </span>
      </div>

      <div className="post-card_body">
        <h3 className="post-card_title">{product_name}</h3>
        <p className="post-card_desc">{description}</p>

        <div className="post-card_price-stock">
          <div className="post-card_price">
            {price}
          </div>
          <div className="post-card_stock">Stock: {stock ?? "N/A"}</div>
        </div>

        <div className="post-card_seller">
          <div className="avatar"/>
          <div className="seller-name">{post_author}</div>
        </div>

        <div className="post-card_location">
          <img 
            src="/location.svg" 
            width="16" 
            height="16" 
            alt="ubicacion"
          />
          <span>{location ?? "Contactar"}</span>
        </div>
      </div>
      <button type="button" className="post-card_cta">
        Ver Detalles
      </button>
    </article>
  );
};

export default PostComponent;
