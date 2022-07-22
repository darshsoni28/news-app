import styles from "../../styles/Feed.module.css";
import { useRouter } from "next/dist/client/router";
import { Toolbar } from "../../components/toolbar";

export const Feed = ({ pageNumber, articles }) => {
  console.log(articles, pageNumber);
  const router = useRouter();
  return (
    <div className="page-container">
      <title>News App</title>
        <Toolbar />
      <div className={styles.main}>
        {articles.map((articles, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = articles.url)}>
              {articles.title}
            </h1>
            <p>{articles.description}</p>
            {!!articles.urlToImage && <img src={articles.urlToImage} />}
          </div>
        ))}
        <div>
          <div className={styles.paginator}>
            <div
              onClick={() => {
                if (pageNumber > 1) {
                  router.push(`/feed/${pageNumber - 1}`).then(window.scroll(0, 0));
                }
              }}
              className={pageNumber === 1 ? styles.disabled : styles.active}
            >
              Previous Page
            </div>
            <div>#{pageNumber}</div>
            <div
              onClick={() => {
                if (pageNumber < 5) {
                  router.push(`/feed/${pageNumber + 1}`).then(window.scroll(0, 0));
                }
              }}
              className={pageNumber === 5 ? styles.disabled : styles.active}
            >
              Next Page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1
      }
    };
  }
  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`
      }
    }
  );

  const apiJson = await apiResponse.json();
  console.log(apiJson);
  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber)
    }
  };
};

export default Feed;
