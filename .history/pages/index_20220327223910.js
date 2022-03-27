import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  console.log("stores", coffeeStores);
  return {
    props: {
      coffeeStores,
    },
  };
}

const Home = (props) => {
  console.log("props", props);

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setcoffeeStoresError] = useState(null);

  const { dispatch } = useContext(StoreContext);

  console.log("latLong", latLong);

  console.log({ locationErrorMsg });

  function HandleOnBannerBtnClick() {
    console.log("hi");
    handleTrackLocation();
  }

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
          setCoffeeStores(fetchedCoffeeStores);

          console.log("effect Stores", fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchCoffeeStores,
            },
          });
        } catch (error) {
          console.log(error);
          setcoffeeStoresError(error.message);
        }
      }
    }
    fetchData();
  }, [latLong]);

  console.log("effect Stores", coffeeStores);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={
            isFindingLocation ? "Locating..." : "View local Coffee Shops"
          }
          handleOnClick={HandleOnBannerBtnClick}
        />
        {locationErrorMsg && (
          <div>
            <h2 style={{ color: "#dfd222" }}>something went wrong:</h2>
            <div
              style={{
                color: "red",
                background: "white",
                width: "20rem",
                padding: "1rem",
              }}
            >
              {locationErrorMsg}
            </div>
          </div>
        )}
        {coffeeStoresError && (
          <h2 style={{ color: "#dfd222" }}>
            Couldn't locate any coffeee stores near you!
          </h2>
        )}
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    className={styles.card}
                  />
                );
              })}
              ;
            </div>
          </>
        )}
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Melbourne</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    className={styles.card}
                  />
                );
              })}
              ;
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
