import { useEffect, useState } from "react";
import "./PostDetail.css";
import type { Post } from "../../types/post";
import { postsService } from "../../api";
import { BACKEND_URL } from "../../api/http";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      postsService.getById(id).then((post) => {
        setPost(post);
      });
    }
  }, [id]);

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="post-detail">
      <div className="post-detail_container">
        <button
          type="button"
          className="post-detail_back"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <article className="post-detail_card">
          <div className="post-detail_image-section">
            <img
              className="post-detail_image"
              src={`${BACKEND_URL}${post.image}`}
              alt={post.product_name}
            />
            <div className="post-detail_badges">
              <span className="post-detail_tag">{post.category}</span>

              <span
                className={`post-detail_status ${
                  post.availability ? "is-available" : "is-unavailable"
                }`}
              >
                <span className="status-dot" />
                {post.availability ? "En la U" : "No disponible"}
              </span>
            </div>
          </div>

          <div className="post-detail_content">
            <header className="post-detail_header">
              <h1 className="post-detail_title">{post.product_name}</h1>
              <div className="post-detail_price">
                ${post.price.toLocaleString("es-CL")}
              </div>
            </header>

            <div className="post-detail_info">
              <div className="post-detail_stock">
                <strong>Stock disponible:</strong> {post.stock ?? "N/A"}
              </div>

              <div className="post-detail_seller">
                <div className="avatar" />
                <div className="seller-info">
                  <strong>Vendedor:</strong>
                  <span>{post.author_name}</span>
                </div>
              </div>

              <div className="post-detail_location">
                <img
                  src="/location.svg"
                  width="16"
                  height="16"
                  alt="ubicacion"
                />
                <span>
                  <strong>Ubicación:</strong> {post.location}
                </span>
              </div>
              <div
                className="post-detail_tags"
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginTop: "8px",
                }}
              >
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="post-detail_tag post-detail_tag--secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="post-detail_description">
              <h3>Descripción</h3>
              <p>{post.description}</p>
            </div>

            {/* <div className="post-detail_gallery">
                <h3>Más imágenes</h3>
                <div className="gallery-grid">
                  {post.images.slice(1).map((image, index) => (
                    <img key={index} src={image} alt={`${post.product_name} ${index + 2}`} />
                  ))}
                </div>
              </div> */}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
