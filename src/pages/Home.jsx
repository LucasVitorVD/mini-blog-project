import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import Posts from "../components/Posts"
import Loading from "../components/Loading"
import "./styles/Home.css"
import BackToTopButton from "../components/BackToTopButton"

const Home = () => {
  const [searchTerms, setSearchTerms] = useState('')
  const navigate = useNavigate()

  const { documents:posts, loading } = useFetchDocuments('posts')

  function handleSubmit(e) {
    e.preventDefault()

    if (searchTerms !== '') {
      return navigate(`/search?q=${searchTerms}`)
    } else {
      return navigate('/')
    }
  }

  return (
    <div className="home_section">
      <header className="home_section__header">
        <h1 id="home_title">Veja os nossos posts mais recentes</h1>
        <form className="header__search_area" onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchTags"
            placeholder="Ou busque por tags"
            className="header__search_input"
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
          <button type="submit" className="header__search_btn">
            Pesquisar
          </button>
        </form>
      </header>

      <section className="posts_section">
        {loading && <Loading />}

        {posts && posts.length > 0 ? (
          posts.map((post) => (
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
          <p>Não há postagens!</p>
        )}
      </section>

      <BackToTopButton />
    </div>
  )
}

export default Home
