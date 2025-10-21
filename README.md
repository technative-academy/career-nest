# CareerNest - Fantasy & Sci-Fi Job Portal

A Javascript project interacting with a custom API for product loading and ChatGPT integration.

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 modules)
- **API Integration**:
    - Products page updated from API source (`https://ai-project.technative.dev.f90.co.uk/products/careernest`)
    - ChatGPT integration via API
- **Architecture**: Class-based OOP with modular imports

## Features

A unique job search platform that connects you with career opportunities from across the multiverse. Powered by AI, CareerNest helps you discover your dream job in fantasy and science fiction universes, from Starfleet officer to Hogwarts professor.

### 🚀 AI-Powered Job Search

- Interactive ChatGPT integration for personalised job recommendations
- Exclusive focus on fantasy and sci-fi universe careers
- Natural language queries (e.g., "I want to work with dragons" or "Show me engineering roles in space")
- Context-aware responses tailored to fictional universes

### 🛒 Product Marketplace

- Browse career-related products and resources
- Real-time product search and filtering
- Sort products by price (ascending/descending)
- Dynamic product loading from API
- Star ratings and detailed product information
- Shopping cart functionality

## Usage

### Job Search Feature

1. Enter your career interests or desired role in the search box
2. The AI will respond with relevant jobs from fantasy and sci-fi universes
3. Example queries:
    - "I'm good at potion making, what jobs would suit me?"
    - "Find me a leadership role in a space station"
    - "What careers involve time travel?"

### Product Marketplace

1. Use the search bar to filter products by title or description
2. Select sort order (price low-to-high or high-to-low)
3. Click "Add to Cart" to add items to your shopping basket
4. View cart count in the header

## API Reference

### Products Endpoint

```
GET https://ai-project.technative.dev.f90.co.uk/products/careernest
```

**Response Format:**

```json
{
  "products": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "price": "string",
      "image": "string",
      "stars": number
    }
  ]
}
```

## Key Features Explained

### Search & Filter System

- Real-time product filtering based on user input
- Case-insensitive search across titles and descriptions
- Dynamic result count display
- Loading states for better UX

### Product Sorting

- Sort by price in ascending or descending order
- Price parsing handles various currency formats
- Maintains filter state while sorting

### Cart Integration

- Modular cart system (imported from `cart.js`)
- Add-to-cart functionality with button state management
- Cart count updates in header

---
