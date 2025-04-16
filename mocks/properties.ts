export interface Property {
  id: string;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  superhost: boolean;
  type: string;
  beds: number;
  bedrooms: number;
  bathrooms: number;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Loft in Downtown",
    location: "New York, NY",
    distance: "5 miles away",
    dates: "Nov 12-17",
    price: 120,
    currency: "USD",
    rating: 4.92,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: true,
    type: "Entire loft",
    beds: 1,
    bedrooms: 1,
    bathrooms: 1
  },
  {
    id: "2",
    title: "Beachfront Villa with Pool",
    location: "Miami, FL",
    distance: "10 miles away",
    dates: "Dec 1-7",
    price: 350,
    currency: "USD",
    rating: 4.85,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: true,
    type: "Entire villa",
    beds: 4,
    bedrooms: 3,
    bathrooms: 2
  },
  {
    id: "3",
    title: "Cozy Mountain Cabin",
    location: "Aspen, CO",
    distance: "15 miles away",
    dates: "Jan 5-10",
    price: 180,
    currency: "USD",
    rating: 4.97,
    reviewCount: 203,
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: false,
    type: "Entire cabin",
    beds: 2,
    bedrooms: 1,
    bathrooms: 1
  },
  {
    id: "4",
    title: "Luxury Penthouse with City View",
    location: "Los Angeles, CA",
    distance: "3 miles away",
    dates: "Nov 20-25",
    price: 420,
    currency: "USD",
    rating: 4.89,
    reviewCount: 95,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: true,
    type: "Entire penthouse",
    beds: 3,
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: "5",
    title: "Charming Cottage by the Lake",
    location: "Seattle, WA",
    distance: "8 miles away",
    dates: "Dec 15-20",
    price: 150,
    currency: "USD",
    rating: 4.95,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: false,
    type: "Entire cottage",
    beds: 2,
    bedrooms: 1,
    bathrooms: 1
  },
  {
    id: "6",
    title: "Historic Brownstone in Brooklyn",
    location: "Brooklyn, NY",
    distance: "2 miles away",
    dates: "Jan 15-20",
    price: 200,
    currency: "USD",
    rating: 4.91,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: true,
    type: "Entire apartment",
    beds: 2,
    bedrooms: 2,
    bathrooms: 1
  },
  {
    id: "7",
    title: "Desert Oasis with Hot Tub",
    location: "Palm Springs, CA",
    distance: "12 miles away",
    dates: "Feb 1-6",
    price: 275,
    currency: "USD",
    rating: 4.88,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: false,
    type: "Entire house",
    beds: 3,
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: "8",
    title: "Rustic Farmhouse Retreat",
    location: "Nashville, TN",
    distance: "20 miles away",
    dates: "Mar 10-15",
    price: 195,
    currency: "USD",
    rating: 4.96,
    reviewCount: 152,
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    superhost: true,
    type: "Entire farmhouse",
    beds: 4,
    bedrooms: 3,
    bathrooms: 2
  }
];