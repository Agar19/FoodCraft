document.addEventListener("DOMContentLoaded", function () {
    const foodSlider = document.querySelector('.food-slider');
    const ingredientsSlider = document.querySelector('.ingredients-slider');

    const foodPrev = document.querySelector('.food-prev');
    const foodNext = document.querySelector('.food-next');
    const ingredientsPrev = document.querySelector('.ingredients-prev');
    const ingredientsNext = document.querySelector('.ingredients-next');

    // Add event listeners for popular foods
    if (foodPrev && foodNext) {
        foodPrev.addEventListener('click', () => {
            foodSlider.scrollBy({ left: -200, behavior: 'smooth' });
        });

        foodNext.addEventListener('click', () => {
            foodSlider.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    // Add event listeners for ingredients
    if (ingredientsPrev && ingredientsNext) {
        ingredientsPrev.addEventListener('click', () => {
            ingredientsSlider.scrollBy({ left: -200, behavior: 'smooth' });
        });

        ingredientsNext.addEventListener('click', () => {
            ingredientsSlider.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});
