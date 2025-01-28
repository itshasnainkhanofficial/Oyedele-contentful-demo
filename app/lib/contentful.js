import * as contentful from 'contentful';

const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
    environment: "master"
});

export const getProductsList = async () => {
    const entries = await client.getEntries({
        content_type: "productPage",
        order: "-sys.updatedAt",
    });
    return entries;
};

export const getProductBySlug = async (slug) => {
    const entries = await client.getEntries({
        content_type: "productPage",
        order: "-sys.updatedAt",
    });
    return entries.items.find((item) => item.fields.slug === slug);
};
