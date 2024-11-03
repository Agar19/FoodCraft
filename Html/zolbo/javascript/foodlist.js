// Fetch recipes from data.json
export async function fetchRecipes() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Display recipes dynamically on the page
export function displayRecipes() {
    fetchRecipes().then(data => {
        const foodSlider = document.querySelector('.food-slider');
        const ingredientSlider = document.querySelector('.ingredients-slider');

        // Clear previous contents if any
        foodSlider.innerHTML = '';
        ingredientSlider.innerHTML = '';

        // Populate food gallery
        data.recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'foodItem';
            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <div class="rating">${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}</div>
            `;

            // Add click event to navigate to the details page
            recipeElement.addEventListener('click', () => {
                // Assuming recipe.id is available and valid
                window.location.href = `foodlistDetails.html?id=${recipe.id}`;
            });
            

            foodSlider.appendChild(recipeElement);
        });

        // Populate ingredient gallery
        data.ingredients.forEach(ingredient => {
            const ingredientElement = document.createElement('div');
            ingredientElement.className = 'ingredientItem';
            ingredientElement.innerHTML = `
                <img src="${ingredient.image}" alt="${ingredient.name}">
                <span>${ingredient.name}</span>
            `;
            ingredientSlider.appendChild(ingredientElement);
        });
    });
}


// Initialize when DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
});
