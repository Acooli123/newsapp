import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "us", pageSize = 8, category = "general", setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - News 24x7`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    if (!apiKey) {
      console.error("🚨 API Key is missing. Check your .env file.");
      return;
    }
    try {
      setLoading(true);
      if (setProgress) setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      if (setProgress) setProgress(70);

      if (parsedData.status === "error") {
        console.error(`🚨 News API Error: ${parsedData.message}`);
        return;
      }

      if (setProgress) setProgress(100);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    if (!apiKey) {
      console.error("🚨 API Key is missing. Check your .env file.");
      return;
    }

    try {
      const nextPage = page + 1;
      setPage(nextPage);

      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.status === "error") {
        console.error(`🚨 News API Error: ${parsedData.message}`);
        return;
      }

      setArticles([...articles, ...(parsedData.articles || [])]);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("❌ Error fetching more news:", error);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0", marginTop: "3.5vw", fontSize: "2rem" }}
      >
        News 24x7 - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row justify-content-center">
            {articles.map((element, index) => (
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                key={element.url || index}
              >
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
