import { Link } from "react-router-dom"
import "./Posts.css"
import AOS from "aos"
import 'aos/dist/aos.css'
import { useEffect } from "react"

const Posts = ({ imageLink, title, authorName, tags, uid }) => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="posts_section__post_content" data-aos="fade-up">
      <figure className="post_content__image_container">
        <img src={imageLink} alt={title} className="post_content__img" />
        <figcaption>{title}</figcaption>
        <span>Autor: {authorName}</span>
      </figure>

      <div className="post_content__tags">
        {tags && (
          tags.map((tag, i) => (
            <p key={i}>
              <strong>#{tag}</strong>
            </p>
          ))
        )}
      </div>

      <Link to={`/posts/${uid}`}>
        <button className="post_content__readPostInfos_btn">Ler</button>
      </Link>
    </div>
  )
}

export default Posts
