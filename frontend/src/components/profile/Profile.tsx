import { useEffect, useState } from "react";
import "./Profile.css";
import type { Post } from "../../types/post";
import { postsService } from "../../api";
import { BACKEND_URL } from "../../api/http";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../api/login";
import type { LoggedUser } from "../../api/login";

const Profile = ({ user: propUser }: { user?: LoggedUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoggedUser | null>(propUser || null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!propUser) {
        const loggedUser = await loginService.restoreLogin();
        if (!loggedUser) {
          navigate("/login");
          return;
        }
        setUser(loggedUser);
      }
      loadMyPosts();
    };
    init();
  }, [propUser, navigate]);

  const loadMyPosts = async () => {
    try {
      const userPosts = await postsService.getMyPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error("Error cargando posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este post?")) {
      return;
    }

    try {
      setDeletingId(id);
      await postsService.delete(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error eliminando post:", error);
      alert("Error al eliminar el post");
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/post/${id}`);
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="profile">
      <div className="profile_container">
        <button
          type="button"
          className="profile_back"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>

        <header className="profile_header">
          <div className="profile_avatar-large" />
          <div className="profile_info">
            <h1 className="profile_username">{user.username}</h1>
            <p className="profile_email">{user.email}</p>
            <p className="profile_stats">{posts.length} publicaciones</p>
          </div>
        </header>

        <section className="profile_posts">
          <h2 className="profile_section-title">Mis Publicaciones</h2>

          {posts.length === 0 ? (
            <div className="profile_empty">
              <p>Aún no has publicado nada</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/new-post")}
              >
                Crear mi primera publicación
              </button>
            </div>
          ) : (
            <div className="profile_posts-grid">
              {posts.map((post) => (
                <article key={post.id} className="profile_post-card">
                  <div className="profile_post-image-wrap">
                    <img
                      className="profile_post-image"
                      src={`${BACKEND_URL}${post.image}`}
                      alt={post.product_name}
                    />
                    <span className="profile_post-tag">{post.category}</span>
                  </div>

                  <div className="profile_post-body">
                    <h3 className="profile_post-title">{post.title}</h3>
                    <p className="profile_post-price">
                      ${post.price.toLocaleString("es-CL")}
                    </p>
                    <p className="profile_post-stock">
                      Stock: {post.stock ?? "N/A"}
                    </p>
                    <p className="profile_post-location">📍 {post.location}</p>
                  </div>

                  <div className="profile_post-actions">
                    <button
                      type="button"
                      className="btn-view"
                      onClick={() => handleViewDetails(post.id)}
                    >
                      Ver Detalles
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
