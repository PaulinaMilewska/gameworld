import "./App.css";
import Layout from "./components/Layout";
import { Carousel } from "3d-react-carousal";
import { slides } from "./components/Slides";
import TopGames from "./components/TopGames";
import ArticleCreate from "./containers/ArticleCreate";
import { Sidebar } from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
// import { useRouteMatch } from "react-router-dom";
import Gallery from "./containers/Gallery";
import GameCatalog from "./containers/GameCatalog";
import AboutUs from "./containers/AboutUs";
import Contact from "./containers/Contact";
import Game from "./containers/Game";
import { useTopGames } from "./components/Firebase";
import { useTopArticles } from "./components/Firebase";
import ArticleCatalog from "./containers/ArticleCatalog";
import Article from "./containers/Article";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import {addGame} from "./components/Firebase"

function App() {
  // addGame();
  const { push } = useHistory();
  const articles = useTopArticles();
  const games = useTopGames();

  // const selectedGameId = useRouteMatch("/games/:game_id")?.params.game_id;
  // const selectedGame =
  //     selectedGameId && games.find((game) => game.game_id === selectedGameId);
  // console.log("game", selectedGame);

  const route = useRouteMatch("/articles/:id");
  const location = useLocation();
  console.log(location);

  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const selectedArticleId = route?.params.id;
    const selectedArticle =
      selectedArticleId &&
      articles.find((article) => article.id === parseInt(selectedArticleId));
    setSelectedArticle(selectedArticle);
  }, [route, articles]);

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <div className="carouselContainer">
            <Carousel slides={slides} autoplay={true} interval={3000} />
          </div>
          <div className="side-by-side">
            <TopGames />
            <Sidebar />
          </div>
        </Route>
        <Route exact path="/articles">
          <ArticleCatalog
            articles={articles}
            onArticleSelect={(id) => push(`/articles/${id}`)}
          />
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
          {/* <GameCatalog onGameSelect={(game_id) => history.push(`/games/${game_id}`)} /> */}
          <GameCatalog topGames={games} />
        </Route>
        <Route path="/games/:game_id">
          <Game />
          {/* <Game game={selectedGame} /> */}
        </Route>

        <Route path="/about-us">
          <AboutUs />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
