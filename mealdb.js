
document.getElementById('error-message').style.display = 'none';
document.getElementById('message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value ;
    // console.log( searchText);
    searchField.value = '';
    // error fetch message
     document.getElementById('error-message').style.display = 'none' ;
     document.getElementById('message').style.display = 'none';
    
    // erroe message
    if(searchText == '' ){
         document.getElementById('message').style.display = 'block'
     }
    else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}` 
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResults(data.meals))

    //handle fetch error
    .catch(error => errorMessage(error)); 
    }
}  
// error message
const errorMessage = error => {
    document.getElementById('error-message').style.display = 'block'
} 

const displaySearchResults = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
  
    meals.forEach(meal => {
        const div = document.createElement('div')
        div.classList.add('col'); 
        div.innerHTML = ` 
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img width="200px" src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>  
     ` ;
        searchResult.appendChild(div);
    })
}
 const loadMealDetail = mealId => {
    //  console.log(detail)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))
 }

 const displayMealDetail = meal => {
    console.log(meal);
     const singleMeal = document.getElementById('meal-detail')
        singleMeal.textContent= ''; 
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>  
        `
        singleMeal.appendChild(div)
    }