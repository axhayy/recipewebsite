const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeClosebtn = document.querySelector('.recipe-close-btn');

// funtion to get recipes
// we use api in it
// await always works with async funtion 
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes....";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML= "";

    response.meals.forEach(meal => {
        // it helps in java script to create html elemenrs
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Ctategory</p>
        `
        const button = document.createElement('button');

        button.textContent = "View Recipe";
        recipeDiv.appendChild(button); 
        recipeContainer.appendChild(recipeDiv);
        //adding event listner to recipe button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

    });
    } 
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching Recipes..</h2>";
    }
}

const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasures${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = ` 
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Intructions : </h3>
            <p >${meal.strInstructions}</p>
        </div> 
    `   
    recipeDetailsContent.parentElement.style.display = "block";

}

recipeClosebtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e) => {
    // prevents from autosubmit
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});
