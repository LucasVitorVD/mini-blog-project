import { useParams } from "react-router-dom";
import { useFetchId } from "../hooks/useFetchId";
import Loading from "../components/Loading";
import "./styles/PostContent.css";

const PostContent = () => {
  const { id } = useParams()
  const { document: post, loading } = useFetchId('posts', id);

  return (
    <section className="post_details_section">
      {loading && <Loading />}
      {post ? (
        <>
          <h1>{post.title}</h1>

          <figure className="post_image">
            <img src={post.image} alt={post.title} />
            <figcaption hidden>{post.author}</figcaption>
          </figure>

          <div className="post_details">
            <p>{post.content}</p>
            <div className="post_details__tags">
              <h3>Tags:</h3>
              <div className="tags">
                {post.tags &&
                  post.tags.map((tag, i) => <span key={i}>#{tag}</span>)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Post não disponível</p>
      )}
    </section>
  );
};

export default PostContent;
