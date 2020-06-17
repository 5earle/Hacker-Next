import fetch from "isomorphic-fetch";
import Error from "next/error";   /*built in error page*/
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import {useEffect} from 'react';

import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';

/*
 *LOGIC:
 * make api fetch to hacker news api
 * map over and display storyList Component
 * change api end pint when page reload
 */

const useStyles = makeStyles({
    footer: {
        padding: '1em',
        '& a':{
            fontWeight: 'bold',
            color: 'black',
            textDecoration: 'none',
        }
    },

});

const Index = (props) => {
    const { stories, page } = props;
    const classes = useStyles();

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then(registration => {
                    console.log("service worker registration successful", registration);
                })
                .catch(err => {
                    console.warn("service worker registration failed", err.message);
                });
        }
    }, []);


    /*display error page*/
    if (stories.length === 0) {
        return <Error statusCode={503} />;
    }


  return (


      <Layout
          title="Hacker Next"
          description="A Hacker News clone made with Next.js"
      >
          {/*pass stories as props*/}
          <StoryList stories={stories} />

          <footer className={classes.footer}>
              {/*incriment the page count so we can read it in getInitialProps*/}
              <Link href={`/?page=${page + 1}`}>
                  <a>Next Page ({page + 1})</a>
              </Link>
          </footer>

      </Layout>
  );
};

/*
 life cycle: will provide a context object abut the route
 destruct the context for {req, res, query}
 */
Index.getInitialProps = async function({req, res, query}) {
    let stories;
    let page; /*hold query param page value*/

    /*handle errors*/
    try {
        page = Number(query.page) || 1; /*get the Number of the query param*/
        const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
        stories = await response.json();
    } catch (err) {
        console.log(err);
        stories = [];
    }

    return { page, stories };
}
export default Index;

