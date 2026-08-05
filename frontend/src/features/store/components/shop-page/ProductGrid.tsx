import ProductCard from "../ProductCard";

export interface ProductCardProps {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  comparePrice: number;
  images: string[];
}

const ProductGrid = ({ products }: { products: ProductCardProps[] }) => {
  return (
    <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          categoryName={product.categoryName}
          price={product.price}
          comparePrice={product.comparePrice}
          images={product.images}
        />
      ))}
    </section>
  );
};

export default ProductGrid;
