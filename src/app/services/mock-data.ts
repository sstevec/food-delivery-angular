// src/app/services/mock-restaurants.ts
export const MOCK_RESTAURANTS = [
  { id: 1, name: 'The Gourmet Kitchen' },
  { id: 2, name: 'Pizza Paradise' },
  { id: 3, name: 'Burger Hub' },
  { id: 4, name: 'Sushi Central' },
  { id: 5, name: 'Pasta Place' },
  { id: 6, name: 'Taco Town' },
  { id: 7, name: 'Healthy Eats' },
  { id: 8, name: 'Steakhouse Supreme' },
  { id: 9, name: 'Vegan Delights' },
  { id: 10, name: 'Seafood Spot' },
  { id: 11, name: 'Fusion Flavors' },
  { id: 12, name: 'BBQ Joint' },
  { id: 13, name: 'Curry Corner' },
  { id: 14, name: 'Sandwich Station' },
  { id: 15, name: 'Fine Dining Experience' },
  { id: 16, name: 'Breakfast Bliss' },
  { id: 17, name: 'Dessert Haven' },
  { id: 18, name: 'Fast Food Fiesta' },
  { id: 19, name: 'Tapas Tapas' },
  { id: 20, name: 'The Salad Bar' },
  // Add more if needed for testing pagination
];

export const MOCK_FOOD_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza' },
  { id: 3, name: 'Caesar Salad', category: 'Salads' },
  { id: 4, name: 'Greek Salad', category: 'Salads' },
  { id: 5, name: 'Cheeseburger', category: 'Burgers' },
  { id: 6, name: 'Double Bacon Burger', category: 'Burgers' },
  { id: 7, name: 'Sushi Roll', category: 'Sushi' },
  { id: 8, name: 'Tempura', category: 'Sushi' },
  // Add more items as needed
];

export const FOOD_CATEGORIES = [
  'Pizza',
  'Salads',
  'Burgers',
  'Sushi'
  // Add more categories as needed
];

export const PAST_ORDERS = [
  { date: new Date(), items: [{ name: 'Pizza', quantity: 2 }, { name: 'Burger', quantity: 1 }] },
  { date: new Date(), items: [{ name: 'Sushi Roll', quantity: 4 }] },
  { date: new Date(), items: [{ name: 'Pasta', quantity: 1 }] },
  { date: new Date(), items: [{ name: 'Salad', quantity: 3 }] },
  { date: new Date(), items: [{ name: 'Tacos', quantity: 5 }] },
  { date: new Date(), items: [{ name: 'Burrito', quantity: 2 }] },
  // Add more items as needed for pagination
];
