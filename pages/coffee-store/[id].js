import { useRouter } from "next/router";
import Link from "next/link";

export default function CoffeStore() {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      <h1>Coffe Store</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
}
