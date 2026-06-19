# RecipeBox - Final Evaluation

A full-stack MERN recipe management application. Your job: implement the missing features.

## 🚀 Getting Started

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Start the Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```

The server will start on `http://localhost:4000` with an in-memory SQLite database pre-seeded with recipes.

### 4. Start the Frontend

Open **another terminal** and run:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`. Open this URL in your browser.

**Keep both terminals running while you work.**

## ✅ What's Already Done

- ✅ Database setup (SQLite in-memory with auto-seeding)
- ✅ All UI/CSS (don't modify these!)
- ✅ Backend infrastructure (routes, validation, error handling)
- ✅ TypeScript types
- ✅ Recipe list with pagination/filtering (backend)
- ✅ Dashboard stats API (backend)

## 🔴 What You Need to Implement

Look for `🔴 TODO` comments in each file for detailed instructions.

### Frontend

**Dashboard:**

- `client/src/features/dashboard/api/dashboardApi.ts`
- `client/src/features/dashboard/components/Dashboard.tsx`
- `client/src/features/dashboard/components/StatsPanel.tsx`

**Recipes:**

- `client/src/features/recipes/api/recipeApi.ts`
- `client/src/features/recipes/hooks/useRecipes.ts`
- `client/src/features/recipes/components/RecipeList.tsx`
- `client/src/features/recipes/components/RecipeCard.tsx`
- `client/src/features/recipes/components/RecipeDetail.tsx`
- `client/src/features/recipes/components/RecipeForm.tsx`
- `client/src/features/recipes/components/CookTimer.tsx`

**Favorites:**

- `client/src/features/favorites/context/FavoritesContext.tsx`
- `client/src/features/favorites/components/FavoriteButton.tsx`
- `client/src/features/favorites/components/FavoritesPage.tsx`

### Backend

- `server/src/modules/recipe/recipe.controller.ts`
- `server/src/modules/recipe/recipe.service.ts`

## 🆘 Common Issues

**"Cannot connect to server"**
→ Make sure the backend server (`cd server && npm run dev`) is running

**"Port already in use"**
→ Stop the running process with `Ctrl+C` and try again

**Database resets when I restart the server**
→ This is expected! The database is in-memory and resets with fresh seed data on each restart.

Good luck! 🚀
