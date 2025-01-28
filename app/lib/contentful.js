import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
  environment: "master",
  headers: {
    'Cache-Control': 'no-cache'
  }
});

export const getProductsList = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "productPage",
      order: "-sys.updatedAt",
    });
    return entries;
  } catch (error) {
    console.error("Error fetching products list:", error);
    return { items: [] }; 
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const entries = await client.getEntries({
      content_type: "productPage",
      "fields.slug": slug,
    });
    return entries.items[0] || null; 
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null; 
  }
};