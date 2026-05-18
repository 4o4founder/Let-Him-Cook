import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// GET ALL RECIPES

router.get('/', async (req, res) => {
    try {
        // .populate('creator', 'username') tells MongoDB to look at the 'creator' ID
        // and fetch the actual 'username' from the Users collection.
        const recipes = await Recipe.find().populate('creator', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE A NEW RECIPE
router.post('/', async (req, res) => {
    const { title, description, ingredients, instructions, image, creator } = req.body;
    const newRecipe = new Recipe({ title, description, ingredients, instructions, image, creator });

    try {
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// DELETE A RECIPE
router.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;