import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
function LadingPage() {
  return (
    <div className="landing-page">
      <header>
        <nav>
          <h1>Hospital</h1>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section class="hero">
          <div class="hero-content">
            <h2>Welcome to Our Hospital</h2>
            <a href="#services" class="cta-button">
              Explore Services
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LadingPage;
