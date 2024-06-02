import { Nav, NavLink } from "@/components/Nav";

// this is bcoz we dont want any cache in admin pages. we want up-to-date data.
export const dynamic = "force-dynamic";

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Order</NavLink>
        <NavLink href="/cart">Cart</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
