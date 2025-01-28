import Layout from "@/app/components/Layout";
import { notFound } from "next/navigation";
import { Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProductBySlug } from "@/app/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function ProductPage({ params }) {
  let product = null;

  try {
    product = await getProductBySlug(params.slug);

    if (!product?.fields) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  const rating = product?.fields?.ratings || 0;
  const quantity = product?.fields?.quantity || 1;
  const imageUrl = product?.fields?.url?.fields?.file?.url || "";
  const title = product?.fields?.title || "No Title";
  const price = product?.fields?.price || 0;
  const description = product?.fields?.description || "";

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={`https:${imageUrl}`}
            alt={title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-black">{title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)}) 120 reviews</span>
          </div>
          <p className="text-2xl font-semibold text-black mb-4">
            ${price.toFixed(2)}
          </p>
          <div className="text-gray-600 mb-6">
            {documentToReactComponents(description)}
          </div>
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <select
              id="quantity"
              name="quantity"
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              {[...Array(quantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4">
            Add to Cart
          </button>
          <div className="space-y-4 text-sm">
            <div className="flex items-center">
              <Truck size={20} className="mr-2 text-gray-600" />
              <span className="text-black">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center">
              <RotateCcw size={20} className="mr-2 text-gray-600" />
              <span className="text-black">30-day return policy</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck size={20} className="mr-2 text-gray-600" />
              <span className="text-black">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}