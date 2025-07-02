import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
    apiKey: "process.env.REACT_APP_NEWS_API",
  };

  state = {
    progress:0
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: "light",
      progress: 0, // Progress state for LoadingBar
    };
  }

  toggleMode = () => {
    this.setState((prevState) => ({
      mode: prevState.mode === "light" ? "dark" : "light",
    }));
  };


  render() {
    return (
      <div
        className={`app-container bg-${this.state.mode} text-${
          this.state.mode === "light" ? "dark" : "light"
        }`}
      >
        <Router>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="general"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="business"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="entertainment"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="general"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="health"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="science"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="sports"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="technology"
                  pageSize={this.props.pageSize}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
