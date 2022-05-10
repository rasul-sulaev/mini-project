import './Header.sass';
import {Link} from "react-router-dom";
import {ReactComponent as IconSearch} from '../../assets/img/icons/search.svg'

export const Header = () => {

  return (
    <header>
      <div className="container">
        <h2 className="title">Мини проект</h2>

        <Link to="/search" title="Поиск">
          <IconSearch height={20} />
        </Link>
      </div>
    </header>
  )
}