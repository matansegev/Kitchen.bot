import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// In-memory storage for demo
let shoppingList = [];
let purchasedItems = [];
let itemIdCounter = 1; // Counter for unique IDs

// Displays the home page with shopping list
app.get("/", (req, res) => {
  res.render("index.ejs", { listItems: shoppingList });
});

// Displays the purchased items page
app.get("/purchase", (req, res) => {
  res.render("purchase.ejs", { purchasedItems });
});

// Adds a new item to the shopping list
app.post("/add", (req, res) => {
  const newItem = req.body.newItem;
  if (newItem.trim() !== "") {
    const id = itemIdCounter++;
    shoppingList.push({ id, title: newItem });
  }
  res.redirect("/");
});

// Deletes an item from the shopping list
app.post("/delete", (req, res) => {
  const id = parseInt(req.body.deleteItemId);
  shoppingList = shoppingList.filter(item => item.id !== id);
  res.redirect("/");
});

// Deletes an item from the purchased items list
app.post("/delete-purchased", (req, res) => {
  const id = parseInt(req.body.deletePurchasedItemId);
  purchasedItems = purchasedItems.filter(item => item.id !== id);
  res.redirect("/purchase");
});

// Updates the expiry date of a purchased item
app.post("/update-expiry", (req, res) => {
  const { itemId, expiryDate } = req.body;
  const item = purchasedItems.find(item => item.id === parseInt(itemId));
  if (item) {
    item.expiryDate = expiryDate;
    res.redirect("/purchase");
  } else {
    res.redirect("/purchase?error=item-not-found");
  }
});

// Moves all items from shopping list to purchased items list
app.post("/purchase", (req, res) => {
  shoppingList.forEach(item => {
    purchasedItems.push({
      id: item.id,
      title: item.title
    });
  });
  shoppingList = [];
  res.redirect("/purchase");
});

// Generates a new recipe using AI based on selected ingredients
// Uses environment variables: OPENAI_MODEL, OPENAI_MAX_TOKENS, OPENAI_TEMP
app.post("/generate-recipe", async (req, res) => {
  try {
    const { selectedItems } = req.body;
    
    if (!selectedItems || selectedItems.length === 0) {
      return res.json({ success: false, error: "No items selected" });
    }

    const prompt = `Based on these ingredients: ${selectedItems.join(', ')}, create a delicious recipe. 
    Please provide the recipe in the following JSON format:
    {
        "title": "Recipe Name",
        "ingredients": ["ingredient1", "ingredient2"],
        "instructions": ["step1", "step2"],
        "cooking_time": "X minutes",
        "difficulty": "Easy/Medium/Hard",
        "servings": "X people",
        "tips": "Optional cooking tips"
    }
    
    IMPORTANT: Respond ONLY with valid JSON. Do not include any other text or explanations.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful cooking assistant. You must respond ONLY with valid JSON format for recipes. Do not include any other text, explanations, or markdown formatting. Just pure JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) ,
      temperature: parseFloat(process.env.OPENAI_TEMP) ,
    });

    const recipeText = completion.choices[0].message.content;
    
    // Try to parse the JSON response
    try {
      const recipe = JSON.parse(recipeText);
      res.json({ 
        success: true, 
        recipe: recipe,
        ingredients: selectedItems 
      });
    } catch (parseError) {
      // If JSON parsing fails, return the raw text
      console.warn('Failed to parse JSON response, returning raw text:', parseError);
      res.json({ 
        success: true, 
        recipe: { 
          title: "Recipe from ChatGPT",
          content: recipeText 
        }, 
        ingredients: selectedItems 
      });
    }

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.json({ 
      success: false, 
      error: "Failed to generate recipe. Please check your API key and try again." 
    });
  }
});

// Starts the server on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
