let fetchItems = [];

const fetchCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data));
};

const displayCategories = (data) => {
  // capture categories container
  const categoryContainer = document.getElementById("categories-container");
  console.log(data);
  //   append all the categories link
  data.news_category.forEach((singleCategory) => {
    categoryContainer.innerHTML += `
    <a class="nav-link" onclick="categoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')">${singleCategory.category_name}</a>
    `;
  });
};

const categoryNews = (categoryId, categoryName) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      fetchItems = data.data;
      displayAll(data.data, categoryName);
    });
};

const displayAll = (data, categoryName) => {
  document.getElementById("news-count").innerText = data.length;
  document.getElementById("category-name").innerText = categoryName;
  const allNews = document.getElementById("all-news");
  allNews.innerHTML = "";
  // news container section
  data.forEach((singleNews) => {
    console.log(singleNews);
    const { image_url, details, title, author, total_view, _id } = singleNews;
    allNews.innerHTML += `
    <div class="card mb-3 container my-4">
    <div class="row g-0">
    <div class="col-md-4">
        <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
            ${details.slice(0, 200)}...
        </p>
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between">
         <div class="d-flex align-items-center">
         <div>
                <img style="" src="${
                  author.img
                }" class="img-fluid rounded-circle me-3" alt="..." height='40' width='40' />
            </div>
            <div>
                <p class="m-0 p-0">${author.name ? author.name : "Nameless"}</p>
                <p class="m-0 p-0">${author.published_date}</p>
            </div>
         </div>
         <div class="d-flex align-items-center"><i class="fa-solid fa-eye"></i> <p class="m-0 ms-2 p-0">${
           total_view ? total_view : "No view"
         }</p></div>
         <div><i class="fa-regular fa-star"></i> </div>
         <div><i onclick="getDetail('${_id}')" type="button"
         data-bs-toggle="modal"
         data-bs-target="#exampleModal" class="fa-solid fa-arrow-right"></i></div>        
        </div>
    </div>
    </div>
</div>
    `;
  });
};

// show news detail

const getDetail = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetail(data.data[0]));
};

const displayDetail = (newsDetail) => {
  const modalBody = document.getElementById("modalContent");
  const { image_url, details, title, author, total_view, _id, others_info } =
    newsDetail;
  modalBody.innerHTML = `
  <div class="card mb-3 container my-4">
  <div class="row g-0">
  <div class="col-md-12">
      <img src="${image_url}" class="img-fluid rounded" alt="..." />
  </div>
  <div class="">
      <div class="card-body">
      <h5 class="card-title">${title} <span class="badge text-bg-danger">${
    others_info.is_trending ? "Trending" : ""
  }</span></h5>
      <p class="card-text">
          ${details}
      </p>
      </div>
      <div class="card-footer border-0 bg-body d-flex justify-content-between">
       <div class="d-flex align-items-center">
       <div>
              <img style="" src="${
                author.img
              }" class="img-fluid rounded-circle me-3" alt="..." height='40' width='40' />
          </div>
          <div>
              <p class="m-0 p-0">${author.name ? author.name : "Nameless"}</p>
              <p class="m-0 p-0">${author.published_date}</p>
          </div>
       </div>
       <div class="d-flex align-items-center"><i class="fa-solid fa-eye"></i> <p class="m-0 ms-2 p-0">${
         total_view ? total_view : "Not Available"
       }</p></div>
       <div><i class="fa-regular fa-star"></i> </div>
  </div>
  </div>
</div>
  `;
};

const displayToday = (category_name) => {
  let trendingNews = fetchItems.filter(
    (singleItem) => singleItem.others_info.is_todays_pick === true
  );
  const category = document.getElementById("category-name").innerText;
  // console.log(trendingNews);
  displayAll(trendingNews, category);
};

const displayTrending = () => {
  const itemsTrending = fetchItems.filter(
    (singleItem) => singleItem.others_info.is_trending === true
  );
  const category = document.getElementById("category-name").innerText;
  displayAll(itemsTrending, category);
};

categoryNews();
