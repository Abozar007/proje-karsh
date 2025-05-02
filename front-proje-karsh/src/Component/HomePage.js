import styles from "./HomePage.module.css";
import Cards from "./Cards";
import Footer from "./Footer";
import Why from "./Why";
import ChatWidget from "./ChatWidget";
import ProductFinder from "./ProductFinder";
import Banner from "./Banner";

function HomePage() {

  return (
    <div className={styles.container}>
      <Banner />
      <div>
        <Why />
      </div>
      <div>
        <ChatWidget />
      </div>
      <div>
        <ProductFinder />
      </div>
      <div>
        <Cards showAll={false} addToCart={(product) => console.log('Added to cart:', product)} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
