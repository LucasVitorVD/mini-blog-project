import { useAuthValue } from "../context/AuthContext"
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuthValue() 
  const { documents:posts, loading, error } = useFetchDocuments('posts', null, user.uid)

  const { deleteDocument } = useDeleteDocument('posts')

  return (
    <section className="dashboard_section">
      <header className="dashboard_header">
        <h1>Dashboard</h1>
        <p>Gerencie os seus posts</p>
      </header>

      {error && <p className="errorStatus">{error}</p>}

      {loading && <Loading />}

      <div className="dashboard_table">
        <div className="dashboard_table__header">
          <p>Título</p>
          <p>Ações</p>
        </div>

        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div className="dashboard_table__body_row" key={post.postId}>
              <span>{post.title}</span>
              <div className="dashboard_table__body_row__actions">
                <Link to={`/posts/${post.postId}`}>
                  <button>Ver</button>
                </Link>
                <Link to={`/posts/edit/${post.postId}`}>
                  <button>Editar</button>
                </Link>
                <button className="deleteBtn" onClick={() => deleteDocument(post.postId)}>Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p>Sem posts!</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
