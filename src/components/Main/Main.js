import './Main.css';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Banner} from "../Banner/Banner";

const Main = ({isBanner, children}) => {
  return (
    <div className="main-block">
      <Header />
      {isBanner && (
        <Banner />
      )}
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Main;