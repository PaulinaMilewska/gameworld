import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import {data} from "./Data";
import {useState, useEffect} from "react";

const settings = {timestampsInSnapshots: true};

//* Original base
var firebaseConfig = {
  apiKey: "AIzaSyD6K_UBeeC2EwujnsrwxBgwcHW-JN0JeUw",
  authDomain: "gameworld-a20b3.firebaseapp.com",
  projectId: "gameworld-a20b3",
  storageBucket: "gameworld-a20b3.appspot.com",
  messagingSenderId: "124412031906",
  appId: "1:124412031906:web:368c522047cb5751bbb8fb",
  measurementId: "G-NN47R5618M",
};

//* New base
// var firebaseConfig = {
//   apiKey: "AIzaSyDLVa5E-IMjWUHp0CodL6m95jnbzO8lkoc",
//   authDomain: "gameworld1-85b63.firebaseapp.com",
//   projectId: "gameworld1-85b63",
//   storageBucket: "gameworld1-85b63.appspot.com",
//   messagingSenderId: "776679957220",
//   appId: "1:776679957220:web:4d4879a95ad023dd2042f1",
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// console.log(20, "firebase.app().name:", firebase.app().name);
firebase.firestore().settings(settings);

export const db = firebase.firestore();

// Eksport do autoryzacji
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//dodanie gier do bazy
export const addGame = (e) => {
  data.forEach((item) => {
    db.collection("games").doc().set(item, {merge: true});
    // .add(item);
  });
};

export function useTopGames() {
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = db.collection("games").onSnapshot((snapshot) => {
      const games = [];
      snapshot.docs.forEach((game) => games.push({id: game.id, ...game.data()}));
      if (isMounted) {
        setTopGames(games);
      }
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return topGames;
}
//dodanie danych z firebase do podstrony messeages
export function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("contacts").onSnapshot((snapshot) => {
      const contacts = [];
      snapshot.docs.forEach((contact) => contacts.push({title: contact.title, ...contact.data()}));
      setMessages(contacts);
    });
  }, []);

  return messages;
}
export function rateArticle(article, value) {
  const currentRating = article.rating;
  const raters = article.raters.length;

  db.collection("articles")
    .doc(article.id)
    .update({
      raters: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      rating: (currentRating * raters + value) / (raters !== 0 ? raters + 1 : 1),
    });
}

export function addComment(article) {
  const form = document.querySelector("#comment__form");
  const comment = form.comment__content.value;
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  let author = "";
  if (auth.currentUser !== null) {
    author = auth.currentUser.email;
  }
  db.collection("articles")
    .doc(article.id)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        content: comment,
        author: author,
        date: date,
      }),
    });
  form.reset();
}

export const addArticle = (event) => {
  const form = document.querySelector("#articleForm");
  const created = Date.now();
  const title = form.title.value;
  const description = form.description.value;
  const content = form.content.value;
  const img = form.img.value;
  const comments = [];
  const raters = [];
  const rating = 0;

  const article = {
    created,
    title,
    description,
    content,
    img,
    comments,
    rating,
    raters,
  };

  db.collection("articles").add(article);
  form.reset();
};

export function useTopArticles() {
  const [topArticles, setTopArticles] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = db.collection("articles").onSnapshot((snapshot) => {
      const articles = [];
      snapshot.docs.forEach((article) =>
        articles.push({
          id: article.id,
          ...article.data(),
        })
      );
      if (isMounted) {
        setTopArticles(articles);
      }
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);
  return topArticles;
}
