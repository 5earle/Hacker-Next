import Link from "next/link";
import Head from "next/head";
import Router from "next/router";


/*
 Common Layout
 with link and Router Back
 */
const Layout = ({ children, title, description, backButton }) => (
  <div>

    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>

    <div className="container">
      <nav>
          {/*if backButton is true rout to previous page*/}
        {backButton && (
          <span onClick={() => Router.back()} className="back-button">
            &#x2b05;
          </span>
        )}

        <Link href="/">
          <a>
            <span className="main-title">Hacker Next</span>
          </a>
        </Link>
      </nav>

      {children}
    </div>

    <style jsx>{`
      .container {
        width: 80%;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 1em;
      }
      nav > * {
        display: inline-block;
        color: black;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-title {
        font-weight: bold;
      }
      nav .back-button {
        font-size: 0.9rem;
        padding-right: 1em;
        cursor: pointer;
      }
    `}</style>
    <style global jsx>{`
      body {
        background: white;
        font-family: Verdana, Geneva, sans-serif;
      }
    `}</style>
  </div>
);

export default Layout;
