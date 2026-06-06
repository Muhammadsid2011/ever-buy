import React from 'react';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import { SignInButton } from "@clerk/react";
import { PackageIcon, SparklesIcon, Plus  } from 'lucide-react';
import { Link } from "react-router"
import useAuthReq from "../hooks/useAuthReq"
import ProductCard from "../components/ProductCard"

function HomePage() {
  const { data: products, isLoading, error } = useProducts();
  const { isSignedIn } = useAuthReq();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role='alert' className="alert alert-error">
        <span>Something went wrong. Please refresh the page</span>
      </div>
    )
  }

  return (
    <div>
      <section className="w-full py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Share your <span className="text-primary">products</span> <br />
              with the world.
            </h1>

            <p className="text-md  text-base-content/70 max-w-sm mx-auto md:mx-0">
              EverBuy simplifies how you showcase your creative assets.
              Join our community and start your journey today.
            </p>

            <div className="flex gap-2 justify-center md:justify-start pt-1">
              {isSignedIn ?
                <Link to="/create">
                  <button className="btn btn-primary btn-sm px-6"><Plus className='size-4'/>Create</button>
                </Link>
                :
                <SignInButton mode="modal">
                  <button className="btn btn-primary btn-sm">Get Started</button>
                </SignInButton>

              }
            </div>
          </div>

          {/* Compact Image Container */}
          <div className="relative w-48 md:w-56">
            <div className="relative p-1 bg-base-200 rounded-xl shadow-md border border-base-300">
              <img
                src="/image.png"
                alt="Product Showcase"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id='marketplace'>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">No products yet</h3>
              <p className="text-base-content/40 text-sm">Be the first to share something!</p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
