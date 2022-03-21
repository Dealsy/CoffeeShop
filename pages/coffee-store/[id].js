import { useRouter } from "next/router";
import Link from "next/link";
import coffeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

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
  const paths = coffeStoresData.map((coffeStore) => {
    return {
      params: {
        id: coffeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeStore(props) {
  const router = useRouter();
  console.log("router", router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, name, neighbourhood, imgUrl } = props.coffeStore;

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
            src={imgUrl}
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
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
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
}
