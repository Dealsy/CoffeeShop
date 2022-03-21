import { useRouter } from "next/router";
import Link from "next/link";
import coffeStoresData from "../../data/coffee-stores.json";

// getStaticProps is server side rendering content
export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeStore: coffeStoresData.find((coffeStore) => {
        return coffeStore.id.toString() === params.id;
      }),
    },
  };
}

// Preloads paths listed in getStatic Paths
// Fallback False will render any page not in paths as a 404
// Fallback True will try to render any page, but this will not be pre-loaded ( if the route does not exsit it will throw an error by default )
export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

export default function CoffeStore(props) {
  const router = useRouter();
  console.log("router", router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Coffe Store</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>{props.coffeStore.address}</p>
      <p>{props.coffeStore.name}</p>
    </div>
  );
}
