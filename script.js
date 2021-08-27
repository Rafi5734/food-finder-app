const searchInput = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const meal = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMeal = document.getElementById("single-meal");
const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("container");


function searchMeal(e) {
    e.preventDefault();
    singleMeal.innerHTML = "";
    const term = searchInput.value;

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ term }`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search results for: "${ term }"</h2>`
                console.log(data.meals[0]);
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results for ${ term }. Try again.</p>`;
                } else {
                    meal.innerHTML = data.meals.map(meals => `
                    <div class="meal">
                        <img src="${ meals.strMealThumb }"/>
                    
                      <div class="meal-info" data-mealID = "${ meals.idMeal }">
                        <h3>${ meals.strMeal }</h3>
                      </div>
                    </div>
                  `).join('');

                }
            });
        search.value = '';


    } else {

        alert("Valid Food or Dish name");

    }



}

function getDataById(m) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ m }`)
        .then(result => result.json())
        .then(data => {
            const meal = data.meals[0];


            addMealDom(meal);
        })
}


function addMealDom(meal) {

    const AllIngredients = [];


    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${ i }`]) {
            AllIngredients.push(`${meal[`strIngredient${ i }`]} - ${meal[`strMeasure${ i }`]}`);
        } else {
            break;
        }

    }


    singleMeal.innerHTML = `
    <div class="single-meal-info">
    <img src="${meal.strMealThumb}">
    <h3 class="single-meal-title">${meal.strMeal}</h3>
    <p>${meal.strInstructions}</p>
    </div>

    <div class="Ingredients-info">
    <h3 class="Ingredients">[:Ingredients:]</h3>
    <ul>
    
    ${AllIngredients.map( ing => `<li>${ing}</li>`).join("")}
    
    </ul>
    </div>
    
    `;
}



meal.addEventListener("click", function(e) {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meal-info");
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealId = mealInfo.getAttribute("data-mealID");
        getDataById(mealId);
    }
})


searchBtn.addEventListener( "click", searchMeal );

random.addEventListener( "click", function ( e )
{
    meal.innerHTML = "";
    resultHeading.innerHTML = "";
})