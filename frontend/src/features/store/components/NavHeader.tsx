import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const NavHeader = ({ storeName }: { storeName: string }) => {
  return (
    <header className="flex justify-between p-4 max-w-360 mx-auto my-0 sticky top-0 bg-white z-50 rounded-b-lg">
      <div>{storeName}</div>
      <nav className="flex gap-6">
        <Link href="home">Home</Link>
        <Link href="catalog">Shop</Link>
        <Link href="contact">Contact</Link>
      </nav>
      <div className="flex gap-4">
        <Search size={18} />
        <ShoppingCart size={18} />
        <User size={18} />
      </div>
    </header>
  );
};

export default NavHeader;
