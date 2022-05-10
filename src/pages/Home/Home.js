import {Banner} from "../../components/Banner/Banner";
import {useTitle} from "../../utils/hooks";

export const Home = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Главная');

  return (
    <>
      <Banner />
      <section>
        <div className="header">
          <h2 className="title">Главная страница</h2>
        </div>
      </section>
    </>
  )
}