if (window.location.search == "") {
  window.location.search = "?q=news&language=en&page=1";
}
let apiKey = "MY_API_KEY";
const input = document.getElementById("searchBar");
const cards = Array.from(document.getElementsByClassName("card"));
const content = Array.from(document.getElementsByClassName("content"));
const image = Array.from(document.getElementsByClassName("image"));
const title = Array.from(document.getElementsByClassName("title"));
const readMore = Array.from(document.getElementsByClassName("readMore"));
const articles = document.getElementById("articles");
const languages = Array.from(document.getElementsByClassName("dropdown-item"));
const results = document.getElementById("results");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let query = "";
let language = "";
let page = null;
if (window.location.search != "") {
  query = window.location.search.split("?")[1].split("&")[0].split("=")[1];
  language = window.location.search.split("?")[1].split("&")[1].split("=")[1];
  page = parseInt(
    window.location.search.split("?")[1].split("&")[2].split("=")[1]
  );
}
input.value = query != "news" ? query.split("%20").join(" ") : "";
async function apiEg(q, l, p) {
  try {
    languages[0].href = `?q=${q}&language=ar&page=1`;
    languages[1].href = `?q=${q}&language=de&page=1`;
    languages[2].href = `?q=${q}&language=en&page=1`;
    languages[3].href = `?q=${q}&language=es&page=1`;
    languages[4].href = `?q=${q}&language=fr&page=1`;
    languages[5].href = `?q=${q}&language=it&page=1`;
    languages[6].href = `?q=${q}&language=nl&page=1`;
    languages[7].href = `?q=${q}&language=pt&page=1`;
    languages[8].href = `?q=${q}&language=ru&page=1`;
    languages[9].href = `?q=${q}&language=zh&page=1`;
    prev.href = `?q=${q}&language=${l}&page=${p - 1}`;
    next.href = `?q=${q}&language=${l}&page=${p + 1}`;
    document.getElementById("home").href = "?q=news&language=en&page=1";
    document.getElementById("sports").href = `?q=sports&language=${l}&page=1`;
    document.getElementById("gaming").href = `?q=gaming&language=${l}&page=1`;
    document.getElementById("weather").href = `?q=weather&language=${l}&page=1`;
    document.getElementById("money").href = `?q=money&language=${l}&page=1`;
    let req = await fetch(
      `https://newsapi.org/v2/everything?q=${
        q != "" ? q : "news"
      }&language=${l}&pageSize=28&page=${p}&sortBy=relavancy&apiKey=${apiKey}`
    );
    let res = await req.json();
    console.log(res);
    if (res.articles.length == 0) {
      articles.innerHTML = '<p class="negative">results not found</p>';
      return;
    }
    let totalPages = Math.ceil(res.totalResults / res.articles.length);
    if (p > totalPages) {
      articles.innerHTML = '<p class="negative">page not found</p>';
      document.getElementsByClassName("page-item")[0].className =
        "page-item disabled";
      document.getElementsByClassName("page-item")[2].className =
        "page-item disabled";
      return;
    }
    let strHtml = "";
    let imgSrc = "no-image.png";
    document.getElementsByClassName("page-item")[0].className =
      p == 1 ? "page-item disabled" : "page-item";
    document.getElementsByClassName("page-item")[2].className =
      p + 1 <= totalPages ? "page-item" : "page-item disabled";
    for (i = 0; i < res.articles.length; i++) {
      let CheckDescription = res.articles[i].description;
      if (CheckDescription != null) {
        CheckDescription.split("<li>").join(" | ");
        CheckDescription.split("<ul>").join(" ");
        CheckDescription.split("</ul>").join(" ");
        CheckDescription.split("<ol>").join(" ");
        CheckDescription.split("</ol>").join(" ");
      }
      q == "news"
        ? (results.innerHTML = "")
        : (results.innerHTML = `<i>showing results for ' ${q
            .split("%20")
            .join(" ")} '</i>`);
      strHtml += `<div class="card rounded-4 text-bg-dark mx-3 my-3" style="width: 18rem;">
      <div class="p-2">
      <img src="${
        res.articles[i].urlToImage != null ? res.articles[i].urlToImage : imgSrc
      }" class="image rounded-4 card-img-top" alt="...">
      <div class="card-body">
        <h5 class="title card-title">${res.articles[i].title}</h5>
        <p class="content card-text">${
          res.articles[i].description != null ? res.articles[i].description : ""
        }</p>
        <a href="${
          res.articles[i].url
        }" class="readMore btn btn-primary">Read More</a>
      </div>
      </div>
    </div>`;
    }
    articles.innerHTML = strHtml;
  } catch (e) {
    console.log(e);
    articles.innerHTML = '<p class="negative">error occured</p>';
  }
}
const getQuery = (e) => {
  e.preventDefault();
  window.location.search = `?q=${
    input.value != "" ? input.value : query
  }&language=${language}&page=1`;
};
apiEg(query, language, page);
