// Function to fetch a single recipe based on ID
async function fetchRecipeById(id) {
    try {
        const response = await fetch('recipeData.json'); // Adjust this path if necessary
        if (!response.ok) throw new Error('Failed to fetch recipe');
        const data = await response.json();
        return data.recipesData.find(recipe => recipe.id === id); // Accessing the correct property
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
}

async function displayRecipeDetails() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get('id'), 10); // Get the ID from the query string

    if (isNaN(recipeId)) {
        console.error('Invalid recipe ID');
        return;
    }

    const recipe = await fetchRecipeById(recipeId);


    if (!recipe) {
        document.getElementById('recipe-list').innerText = 'Recipe not found';
        return;
    }

    // Populate the recipe details in the page
    document.getElementById('recipe-title').innerText = recipe.title || 'No title available';
    document.getElementById('recipe-image').src = recipe.image || 'default-image.jpg';
    document.getElementById('recipe-image').alt = recipe.title || 'Recipe Image';

    // Set video URL if available
    if (recipe.video) {
        document.getElementById('recipe-video').src = recipe.video;
    }

    // Populate ingredients
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = ''; // Clear previous ingredients
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerText = ingredient;
        ingredientList.appendChild(li);
    });

    // Populate instructions
    const instructionList = document.getElementById('instruction-list');
    instructionList.innerHTML = ''; // Clear previous instructions
    if (Array.isArray(recipe.instructions) && recipe.instructions.length > 0) {
        recipe.instructions.forEach(step => {
            const li = document.createElement('li');
            li.innerText = step;
            instructionList.appendChild(li);
        });
    } else {
        instructionList.innerHTML = '<li>No instructions found.</li>';
    }

    // Check and populate nutrition information safely
    if (recipe.nutrition) {
        document.getElementById('calories').innerText = `Calories: ${recipe.nutrition.calories || 'N/A'}`;
        document.getElementById('protein').innerText = `Protein: ${recipe.nutrition.protein || 'N/A'}g`;
        document.getElementById('fat').innerText = `Fat: ${recipe.nutrition.fat || 'N/A'}g`;
        document.getElementById('carbohydrates').innerText = `Carbohydrates: ${recipe.nutrition.carbohydrates || 'N/A'}g`;
    } else {
        console.error('Nutrition data is missing:', recipe);
        document.getElementById('calories').innerText = 'Nutrition information not available.';
        document.getElementById('protein').innerText = '';
        document.getElementById('fat').innerText = '';
        document.getElementById('carbohydrates').innerText = '';
    }
}

// Initialize when DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    displayRecipeDetails();
});
