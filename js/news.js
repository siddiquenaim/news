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
    .then((data) => displayAll(data, categoryName));
};

const displayAll = (data, categoryName) => {
  document.getElementById("news-count").innerText = data.data.length;
  document.getElementById("category-name").innerText = categoryName;
};
