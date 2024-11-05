import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingBasket } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const imageUrl = (image) => `http://localhost:4000/uploads/${image}`;

const ProductDetails = () => {
  const { productsData, currency, addToCart, addToFavorite } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = productsData.find((item) => item._id === id);
    setProduct(foundProduct || null);
    setMainImage(foundProduct?.images?.[0] || "");
    setQuantity(1);
  }, [id, productsData]);

  if (!product) {
    return <main className="mx-auto max-w-6xl px-5 py-24 text-center text-[#55705d]">Loading product…</main>;
  }

  const categoryName = product.category?.name || product.category;
  const relatedProducts = productsData.filter(
    (item) => (item.category?.name || item.category) === categoryName && item._id !== product._id
  );

  const addSelectedQuantity = () => {
    Array.from({ length: quantity }).forEach(() => addToCart(product));
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 md:pt-12">
      <nav className="mb-9 text-sm text-[#7b8d80]" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-secondary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-secondary">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-[#193b2a]">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <section className="grid gap-4 sm:grid-cols-[88px_1fr] sm:items-start" aria-label="Product images">
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
            {product.images.map((image, index) => (
              <button key={image} type="button" onClick={() => setMainImage(image)} className={`h-20 w-20 shrink-0 border bg-[#f5f6f1] p-2 transition-colors ${mainImage === image ? "border-secondary" : "border-[#d8e0d4] hover:border-[#8fa492]"}`} aria-label={`View image ${index + 1}`}>
                <img src={imageUrl(image)} alt="" className="h-full w-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
          <div className="order-1 flex min-h-[360px] items-center justify-center bg-[#f5f6f1] p-8 sm:order-2 md:min-h-[520px]">
            <img src={imageUrl(mainImage)} alt={product.name} className="max-h-[460px] w-full object-contain mix-blend-multiply" />
          </div>
        </section>

        <section className="lg:pt-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{categoryName}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#193b2a] md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-sm text-[#55705d]">{product.weight}</p>

          <div className="mt-7 flex items-baseline gap-3 border-y border-[#d8e0d4] py-5">
            <span className="text-2xl font-semibold text-secondary">{currency}{product.offerPrice}</span>
            <span className="text-base text-[#9aaa9d] line-through">{currency}{product.price}</span>
          </div>

          <p className="mt-6 max-w-md text-base leading-7 text-[#55705d]">{product.smallDesc}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center border border-[#b8c7b9] bg-[#fbfaf5]">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-full w-11 items-center justify-center text-secondary hover:bg-[#eef3e9]" aria-label="Decrease quantity"><Minus size={16} /></button>
              <span className="w-8 text-center text-sm text-[#193b2a]">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} className="flex h-full w-11 items-center justify-center text-secondary hover:bg-[#eef3e9]" aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <button type="button" onClick={addSelectedQuantity} className="flex h-12 flex-1 items-center justify-center gap-2 bg-secondary px-6 text-sm font-semibold text-white transition-colors hover:bg-[#193b2a] sm:flex-none"><ShoppingBasket size={18} /> Add to basket</button>
            <button type="button" onClick={() => addToFavorite(product)} className="flex h-12 w-12 items-center justify-center border border-[#b8c7b9] text-secondary transition-colors hover:border-primary hover:text-primary" aria-label="Add to wishlist"><Heart size={19} /></button>
          </div>

          <div className="mt-10 border-t border-[#d8e0d4] pt-7">
            <h2 className="text-lg font-semibold text-[#193b2a]">About this produce</h2>
            <p className="mt-3 text-sm leading-7 text-[#55705d]">{product.longDesc}</p>
          </div>
        </section>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-[#d8e0d4] pt-10" aria-labelledby="related-products">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">From the same shelf</p><h2 id="related-products" className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a]">You may also like</h2></div>
            <Link to="/shop" className="hidden text-sm font-medium text-secondary underline decoration-primary underline-offset-4 sm:block">View all produce</Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.slice(0, 4).map((item) => <ProductCard key={item._id} product={item} />)}</div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
