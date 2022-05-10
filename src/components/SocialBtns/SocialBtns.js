import './SocialBtns.sass';
import {SOCIAL_BTNS} from "../../utils/constants";
import '../../assets/libs/font-awesome/css/font-awesome.min.css';

export const SocialBtns = (props) => {
  return (
    <div className="social-btns-list" style={props.style}>
      {
        SOCIAL_BTNS.map((item) => {
          return (
            <a key={item.id} className={'social-btn ' + item.className} href={item.link}><span className="social-btn-title">{item.title}</span></a>
          )
        })
      }
    </div>
  )
}