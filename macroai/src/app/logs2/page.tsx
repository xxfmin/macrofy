import Meal from "../../../../backend/src/models/MealModel";
import mongoose from 'mongoose';

async function getMealLogs(userId: string) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  const meals = await Meal.find({ user: userId }).lean();
  return meals.map((meal) => ({
    imageUrl: meal.imageUrl,
    ingredients: meal.ingredients,
    total_macros: meal.total_macros,
    timestamp: meal.timestamp.toString(),
  }));
}

export default async function MealLogs({ params }: { params: { userId: string } }) {
  const meals = await getMealLogs(params.userId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Meal Logs</h1>
      {meals.length === 0 ? (
        <p>No meal logs found</p>
      ) : (
        <ul className="space-y-4">
          {meals.map((meal, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img src={meal.imageUrl} alt="Meal" className="max-w-full mb-4" />
              <p>
                <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
              </p>
              <p>
                <strong>Protein:</strong> {meal.total_macros.protein}g
              </p>
              <p>
                <strong>Fat:</strong> {meal.total_macros.fat}g
              </p>
              <p>
                <strong>Carbs:</strong> {meal.total_macros.carbs}g
              </p>
              <p>
                <strong>Calories:</strong> {meal.total_macros.calories}
              </p>
              <p>
                <strong>Logged at:</strong> {new Date(meal.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
