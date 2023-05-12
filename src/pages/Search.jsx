import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useQuery } from "../hooks/useQuery";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import Loading from "../components/Loading";
import "./styles/Search.css"

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: post, loading } = useFetchDocuments("posts", search);

  return (
    <div className="search-section">
      <h2>Tag pesquisada: {search}</h2>
      <section className="posts_section">
        {loading && <Loading />}

        {post && post.length > 0 ? (
          post.map((post) => (
            <Posts
              key={post.postId}
              imageLink={post.image}
              title={post.title}
              authorName={post.author}
              tags={post.tags}
              uid={post.postId}
            />
          ))
        ) : (
          <div className="not-found">
            <p>Não foram encontrados posts com essa busca.</p>
            <Link to="/">
                <button>Voltar</button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;
