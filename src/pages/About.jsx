import "./styles/About.css"
import { Link } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"

const About = () => {
  const { user } = useAuthValue()

  return (
    <section className="about_section">
      <div className="about_section__header">
        <h1>Sobre o Mini Blog</h1>
        <span>Este projeto consiste em um blog feito com React no Front-end e Firebase no Back-end.</span>
      </div>
      
      <Link to={user ? '/newpost' : '/login'}>
        <button>Criar post</button>
      </Link>
    </section>
  )
}

export default About