import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String], // This is an array of strings
    instructions: { type: String, required: true },
    image: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;