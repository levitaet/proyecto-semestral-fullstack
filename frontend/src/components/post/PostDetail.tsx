import { useEffect, useState } from "react";
import axios from "axios";
import "./PostDetail.css";
import type { Post } from "../../types/post";


interface PostDetailProps {
  postId: string;
  onGoBack: () => void;
}

const PostDetail = ({ postId, onGoBack }: PostDetailProps) => {
  const [post, setPost] = useState<Post | null>(null); //para el post que vamos a ver en detalle

    useEffect(() => {
    axios.get(`http://localhost:3001/posts/${postId}`).then((response) => {
      setPost(response.data);
    });
    }, [postId]);

  if (!post) {
    return null; 
  }

  return (
    <div className="post-detail">
      <div className="post-detail_container">
        <button type="button" className="post-detail_back" onClick={onGoBack}>
          ← Volver
        </button>

        <article className="post-detail_card">
          <div className="post-detail_image-section">
            <img 
              className="post-detail_image" 
              src={post.image} 
              alt={post.product_name} 
            />
            <div className="post-detail_badges">
              <span className="post-detail_tag">{post.tag}</span>
              <span
                className={`post-detail_status ${
                  post.availability ? "is-available" : "is-unavailable"
                }`}
              >
                <span className="status-dot"/>
                {post.availability ? "En la U" : "No disponible"}
              </span>
            </div>
          </div>

          <div className="post-detail_content">
            <header className="post-detail_header">
              <h1 className="post-detail_title">{post.product_name}</h1>
              <div className="post-detail_price">{post.price}</div>
            </header>

            <div className="post-detail_info">
              <div className="post-detail_stock">
                <strong>Stock disponible:</strong> {post.stock ?? "N/A"}
              </div>

              <div className="post-detail_seller">
                <div className="avatar"/>
                <div className="seller-info">
                  <strong>Vendedor:</strong>
                  <span>{post.post_author}</span>
                </div>
              </div>

              <div className="post-detail_location">
                <img 
                  src="/location.svg" 
                  width="16" 
                  height="16" 
                  alt="ubicacion"
                />
                <span><strong>Ubicación:</strong> {post.location}</span>
              </div>
            </div>

            <div className="post-detail_description">
              <h3>Descripción</h3>
              <p>{post.description}</p>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;