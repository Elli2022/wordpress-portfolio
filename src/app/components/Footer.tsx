import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer site-footer-2023">
      <div className="footer-links-2023">
        <a href="mailto:eleonora.nocentini@gmail.com">
          ELEONORA.NOCENTINI@GMAIL.COM
        </a>
        <span className="footer-sep-2023">|</span>
        <a
          href="https://github.com/Elli2022"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB.COM/ELLI2022
        </a>
      </div>
      <p className="footer-copy-2023">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
