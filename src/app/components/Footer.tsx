import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <a href="mailto:eleonora.nocentini@gmail.com">eleonora.nocentini@gmail.com</a>
        <span className="footer-sep">·</span>
        <a
          href="https://github.com/Elli2022"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
