import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [clicked, setClicked] = useState(false);

  return (
    <header className="header">
      <span className="header__logo">
        <Link to="/">
          Mini <strong>BLOG</strong>
        </Link>
      </span>

      <nav className={clicked ? `header__nav active` : `header__nav`}>
        <NavLink to="/">Home</NavLink>

        {!user && (
          <>
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/register">Cadastrar</NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/newpost">Novo post</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}

        <NavLink to="/about">Sobre</NavLink>

        {user && <span onClick={logout}>Sair</span>}
      </nav>

      <div className="mobile">
        {clicked === false ? (
          <button
            className="menu_btn"
            onClick={() => setClicked(true)}
          >
            <AiOutlineMenu size={22} className="menu_icon" />
          </button>
        ) : (
          <button
            className="menu_btn close_btn"
            onClick={() => setClicked(false)}
          >
            <AiOutlineClose size={22} className="menu_icon" />
          </button>
        )}
      </div>
    </header>
  );
}
