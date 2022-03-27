import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../_app";
import { isEmpty } from "../../utils";

// getStaticProps is server side rendering content
export async function getStaticProps(staticProps) {
  const coffeeStores = await fetchCoffeeStores();
  const params = staticProps.params;

  console.log("paramas", params);

  const findCoffeeStoreById = coffeeStores.find((coffeStore) => {
    return coffeStore.fsq_id.toString() === params.id; // Dynamin ID
  });

  return {
    props: {
      coffeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

// Preloads paths listed in getStatic Paths
// Fallback False will render any page not in paths as a 404
// Fallback True will try to render any page, but this will not be pre-loaded ( if the route does not exsit it will throw an error by default )
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeStore) => {
    return {
      params: {
        id: coffeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeStore = (initialProps) => {
  const router = useRouter();
  console.log("router", router);

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.CoffeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStore.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeStore) => {
          return coffeStore.fsq_id.toString() === id; // Dynamin ID
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  const { location, name, neighborhood, imgUrl } = coffeeStore;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {
    console.log(handleUpvoteButton);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1>Coffe Store</h1>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back To The Home Page</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}> {name} </h1>
          </div>

          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={600}
            height={560}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="25"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{location.locality}</p>
            <p className={styles.text}>{location.postcode}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeStore;
