# Kitchen.bot 🍳

A web application for kitchen management and recipe organization, powered by OpenAI's AI technology to provide intelligent cooking assistance and recipe recommendations.

## 🌐 Live Demo

**Live on Render**: [https://kitchen-bot-9yee.onrender.com/](https://kitchen-bot-9yee.onrender.com/)

> *Experience Kitchen.bot in action with full AI-powered recipe generation and kitchen management features.*

## 🚀 What is Kitchen.bot?

Kitchen.bot is your AI-powered kitchen companion that helps you:
- Discover new recipes based on available ingredients
- Get cooking tips and techniques from AI
- Plan meals and shopping lists intelligently
- Learn about food nutrition and substitutions
- Manage your kitchen inventory efficiently


## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Kitchen.bot
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. Start the application
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 🤖 OpenAI Integration

Kitchen.bot leverages OpenAI's powerful GPT models to provide intelligent cooking assistance:

- **Recipe Generation**: Create unique recipes based on available ingredients
- **Cooking Tips**: Get expert advice on cooking techniques and methods
- **Ingredient Substitutions**: Find alternatives for missing ingredients
- **Meal Planning**: AI-powered meal suggestions based on preferences
- **Nutrition Guidance**: Get detailed nutritional information and recommendations

### OpenAI API Configuration

The application uses the following OpenAI environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key
- `OPENAI_MODEL` - GPT model to use (default: gpt-4o-mini)
- `OPENAI_MAX_TOKENS` - Maximum tokens per response
- `OPENAI_TEMP` - Temperature setting for AI creativity (0.0-1.0)

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating engine
- **AI Integration**: OpenAI GPT API
- **Styling**: CSS3 with modern responsive design (optimized for performance)
- **Package Manager**: npm

## 📊 Performance & Optimization

### CSS Optimization
The application's CSS has been optimized for better performance:
- **main.css**: Reduced from 259 to 164 lines (37% reduction)
- **purchase.css**: Reduced from 595 to 331 lines (44% reduction)
- **Total savings**: 359 lines of CSS code
- **Maintained**: Full visual appearance and functionality
- **Benefits**: Faster loading, easier maintenance, better performance

## 📁 Project Structure

```
Kitchen.bot/
├── public/          # Static assets (CSS, images)
├── views/           # EJS templates
├── index.js         # Main application file
├── package.json     # Project dependencies
├── .env.example     # Environment variables template
├── screenshots/     # Application screenshots
└── .gitignore       # Git ignore rules
```

