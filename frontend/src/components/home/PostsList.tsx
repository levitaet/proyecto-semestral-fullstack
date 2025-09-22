import PostComponent from '../post/PostComponent';
import type { Post } from '../../types/post';
import { useEffect, useState } from "react";
import { DropMenu } from "./DropMenu";
import axios from "axios";

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<{id: number, name: string}[]>([]);
    const [tagExpanded, setTagExpanded] = useState(false);
    const [tagFilter, setTagFilter] = useState<string | null>(null);
    const [availabilityExpanded, setAvailabilityExpanded] = useState(false);
    const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);
    const states = [{id: 1, name: "Cualquier disponibilidad"}, {id: 2, name: "En la U ahora"}];

    
    function filteredPosts(postsData: Post[]): Post[] {
        return postsData.filter((post) => {
            if (tagFilter && post.tag !== tagFilter) {
                return false;
            }
            if (availabilityFilter && post.availability !== availabilityFilter) {
                return false;
            }
            return true;
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3001/tags").then((response) => {
        setTags(response.data);
        });
    }, []);

    useEffect(() => { 
        axios.get("http://localhost:3001/posts").then((response) => {
        setPosts(filteredPosts(response.data));
        });
    }, [tagFilter, availabilityFilter]);

    return (
        <div>
            <section className="home_filters">
          <button type="button" className="filter-btn filter-btn--search" onClick={() => {}}>
            <img src="/search-icon.svg" width="18" height="18" alt="lupita" />
            <span>Buscar productos o vendedores...</span>
          </button>

          <div className="filter-group">
            <button type="button" className="filter-btn" onClick={() => {
              setTagExpanded(!tagExpanded);
            }}>
              <span>{tagFilter || "Todas"}</span>
              <span className="chevron">▾</span>
            </button>
            {tagExpanded && (
              <div className="dropdown">
                <DropMenu 
                  data={tags}
                  onSelect={(item : string) => {
                    setTagFilter(item);
                    setTagExpanded(false);
                  }}
                />
              </div>
            )}  
          </div>

          <div className="filter-group">
            <button type="button" className="filter-btn" onClick={() => {
              setAvailabilityExpanded(!availabilityExpanded);
            }}>
              <span className="dot dot--on" />
              <span>{availabilityFilter ? "En la U ahora" : "Cualquier disponibilidad"}</span>
            </button>
            {availabilityExpanded && (
              <div className="dropdown">
                <DropMenu 
                  data={states}
                  onSelect={(item : string) => {
                    setAvailabilityFilter(item === "En la U ahora");
                    setAvailabilityExpanded(false);
                  }}
                />
              </div>
            )}
          </div>

        </section>

        <main className="home_grid">
          {posts.map((post) => (
            <PostComponent key={post.id} {...post} />
          ))}
        </main>
        </div>
    );
};

export default PostsList;