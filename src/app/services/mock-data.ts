// src/app/services/mock-restaurants.ts
export const MOCK_RESTAURANTS = [
  {id: 1, name: 'The Gourmet Kitchen', imageUrl: "assets/images/res_image2.jpeg"},
  {id: 2, name: 'Pizza Paradise', imageUrl: "assets/images/home_bg.jpeg"},
  {id: 3, name: 'Burger Hub', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 4, name: 'Sushi Central', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 5, name: 'Pasta Place', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 6, name: 'Taco Town', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 7, name: 'Healthy Eats', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 8, name: 'Steakhouse Supreme', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 9, name: 'Vegan Delights', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 10, name: 'Seafood Spot', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 11, name: 'Fusion Flavors', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 12, name: 'BBQ Joint', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 13, name: 'Curry Corner', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 14, name: 'Sandwich Station', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 15, name: 'Fine Dining Experience', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 16, name: 'Breakfast Bliss', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 17, name: 'Dessert Haven', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 18, name: 'Fast Food Fiesta', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 19, name: 'Tapas Tapas', imageUrl: "assets/images/res_image1.jpeg"},
  {id: 20, name: 'The Salad Bar', imageUrl: "assets/images/res_image1.jpeg"},
  // Add more if needed for testing pagination
];

export const MOCK_FOOD_ITEMS = [
  {id: 1, name: 'Margherita Pizza', category: 'Pizza'},
  {id: 2, name: 'Pepperoni Pizza', category: 'Pizza'},
  {id: 3, name: 'Caesar Salad', category: 'Salads'},
  {id: 4, name: 'Greek Salad', category: 'Salads'},
  {id: 5, name: 'Cheeseburger', category: 'Burgers'},
  {id: 6, name: 'Double Bacon Burger', category: 'Burgers'},
  {id: 7, name: 'Sushi Roll', category: 'Sushi'},
  {id: 8, name: 'Tempura', category: 'Sushi'},
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
  {date: new Date(), items: [{name: 'Pizza', quantity: 2}, {name: 'Burger', quantity: 1}]},
  {date: new Date(), items: [{name: 'Sushi Roll', quantity: 4}]},
  {date: new Date(), items: [{name: 'Pasta', quantity: 1}]},
  {date: new Date(), items: [{name: 'Salad', quantity: 3}]},
  {date: new Date(), items: [{name: 'Tacos', quantity: 5}]},
  {date: new Date(), items: [{name: 'Burrito', quantity: 2}]},
  // Add more items as needed for pagination
];
