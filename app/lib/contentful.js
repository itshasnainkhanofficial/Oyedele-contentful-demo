import * as contentful from 'contentful';

const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
    environment: "master"
});

const getProductsList = async () => {
    const entries = await client.getEntries({ content_type: "productPage" });
    return entries;
};

const getProductBySlug = async (slug) => {
    const entries = await client.getEntries({ content_type: "productPage" });
    const product = entries.items.find((item) => item.fields.slug === slug);
    return product;
  };

export { getProductsList, getProductBySlug };