import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, date, author, source }) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt="News Thumbnail" />
        <div className="card-body">
          <h5 className="card-title">
            {title}...
            <h6>
              <span className="position-absolute top-0 leftstart-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: "0.8rem", whiteSpace: "nowrap",position: "center",marginLeft: "1.5vw",marginTop:"0.7vw", padding: "5px 10px" }}>
                {source}
              </span>
            </h6>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
