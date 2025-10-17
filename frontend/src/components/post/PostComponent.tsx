import "./PostComponent.css";

interface PostComponentProps {
  id: string;
  title: string;
  price: string;
  product_id: string;
  author_id: string;
  tag: string;
  location: string;
  availability: boolean;
  stock: number | null;
  image: string;
  onPostClick?: (id: string) => void;
}

const PostComponent = ({
  id,
  title,
  price,
  tag,
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
        <img className="post-card_image" src={image} alt={title} />

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
        <h3 className="post-card_title">{title}</h3>
        {/* <p className="post-card_desc">{description}</p> */}

        <div className="post-card_price-stock">
          <div className="post-card_price">
            {price}
          </div>
          <div className="post-card_stock">Stock: {stock ?? "N/A"}</div>
        </div>

        <div className="post-card_seller">
          <div className="avatar"/>
          {/* VER AUTOR -> profile (? */}
          {/* <div className="seller-name">{author_id}</div> */}
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
