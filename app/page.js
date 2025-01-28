import Image from "next/image";
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from "next/link"
import Layout from "@/app/components/Layout"
import { Star } from "lucide-react"
import { getProductsList } from "./lib/contentful";

export default async function Home() {
  const { items } = await getProductsList();
  const productList = items?.map((item) => item?.fields);
  console.log("productList", productList);

  return (
    <Layout>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Welcome to ModernShop</h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
          Discover the latest trends in fashion and technology. Shop our curated collection of premium products.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-black">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList?.map((product) => (
            <Link
              href={`/product/${product.slug}`} key={product.slug}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative pb-[100%]">

                <Image
                  src={`https:${product.url.fields.file.url}`}
                  alt={product.url.fields.title}
                  width={200}
                  height={200}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-black">{product?.title}</h3>
                <p className="text-gray-600 mb-2">${product?.price?.toFixed(2)}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product?.ratings) ? "text-yellow-400" : "text-gray-300"}
                      fill={i < Math.floor(product?.ratings) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product?.ratings.toFixed(1)})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-gray-800 text-white py-12 px-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h2>
          <p className="text-center mb-6">Stay updated with our latest offers and products</p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}