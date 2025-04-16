import { init, i, InstaQLEntity } from "@instantdb/react-native";

// ID for app: airbnb-demo
const APP_ID = "2e4709b5-400f-46f4-af3c-99f3037bd290";

// Optional: You can declare a schema!
const schema = i.schema({
  entities: {
    images: i.entity({
      id: i.string(),
      url: i.string(),
    }),
    properties: i.entity({
      id: i.string(),
      bathrooms: i.number(),
      bedrooms: i.number(),
      beds: i.number(),
      currency: i.string(),
      dates: i.string(),
      distance: i.number(),
      location: i.string(),
      price: i.number(),
      rating: i.number(),
      reviewCount: i.number(),
      superhost: i.boolean(),
      title: i.string(),
      type: i.string(),
    }),
  },
});

type Property = InstaQLEntity<typeof schema, "properties">;
type Image = InstaQLEntity<typeof schema, "images">;

export { schema, Property, Image };
