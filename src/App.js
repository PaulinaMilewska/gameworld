import "./App.css";
import Layout from "./components/Layout";
import ArticleCreate from "./containers/ArticleCreate";
import Home from "./containers/Home";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Gallery from "./containers/Gallery";
import GameCatalog from "./containers/GameCatalog";
import AboutUs from "./containers/AboutUs";
import Contact from "./containers/Contact";
import Messages from "./containers/Messages";
import Game from "./containers/Game";
import { useTopGames } from "./components/Firebase";
import { useTopArticles } from "./components/Firebase";
import ArticleCatalog from "./containers/ArticleCatalog";
import SearchPage from "./containers/SearchPage";
import Article from "./containers/Article";
import { useEffect, useState } from "react";
// import {addGame} from "./components/Firebase"

function App() {
  // addGame();
  const games = useTopGames();
  const articles = useTopArticles(); // metoda fetch z Firebase.js
  const articleRoute = useRouteMatch("/articles/:id");
  const [selectedArticle, setSelectedArticle] = useState(null);
  useEffect(() => {
    const selectedArticleId = articleRoute?.params.id;
    const selectedArticle =
      selectedArticleId &&
      articles.find((article) => article.id === selectedArticleId);
    setSelectedArticle(selectedArticle);
  }, [articleRoute, articles]);

  const list = articles.map((article) => {
    return (
      <Link to={`/articles/${article.id}`}>
        <img
          src={article.img}
          alt={article.title}
          style={{ width: "800px", height: "300px" }}
        />
        <p className="content">{article.title}</p>
      </Link>
    );
  });

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home list={list} games={games} />
        </Route>
        <Route exact path="/articles">
          <ArticleCatalog articles={articles} />
        </Route>
        <Route path="/articles/:id">
          <Article article={selectedArticle} />
        </Route>

        <Route path="/create-article">
          <ArticleCreate />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route exact path="/games">
          <GameCatalog topGames={games} />
        </Route>
        <Route exact path="/games/:id">
          <Game games={games} />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route exact path="/search/">
          <SearchPage games={games} articles={articles} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
