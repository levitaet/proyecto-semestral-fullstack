import "./PostComponent.css";
import {BACKEND_URL} from "../../api/http";

interface PostComponentProps {
  id: string;
  title: string;
  product_name: string;
  price: number;
  author_name: string;
  tags: string[];
  category: string;
  location: string;
  availability: boolean;
  stock: number | null;
  image: string;
  onPostClick?: (id: string) => void;
}

const PostComponent = ({
  id,
  title,
  product_name,
  price,
  category,
  location,
  availability,
  stock,
  image,
  onPostClick
}: PostComponentProps) => {

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(id);
    }
  };

  return (
    <article className="post-card">
      <div className="post-card_image-wrap">
        <img className="post-card_image" src={`${BACKEND_URL}${image}`} alt={product_name} />

        <span className="post-card_tag">{category}</span>

        <span
          className={`post-card_status ${
            availability ? "is-available" : "is-unavailable"
          }`}
        >
          <span className="status-dot"/>
          {availability ? "En la U" : "No disponible"}
        </span>
      </div>

      <div className="post-card_body">
        <h3 className="post-card_title">{title}</h3>

        <div className="post-card_price-stock">
          <div className="post-card_price">
            ${price.toLocaleString('es-CL')}
          </div>
          <div className="post-card_stock">Stock: {stock ?? "N/A"}</div>
        </div>

        <div className="post-card_seller">
          <div className="avatar"/>
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
      <button type="button" className="post-card_cta" onClick={handleClick}>
        Ver Detalles
      </button>
    </article>
  );
};

export default PostComponent;