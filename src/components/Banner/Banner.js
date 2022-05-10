import './Banner.sass'
import bannerImgPlaceholder from '../../assets/img/bg.jpg'

export const Banner = ({
  bgImage = bannerImgPlaceholder,
  title = 'Slogan...',
  description = 'lorem ipsum dolor sit amot...',
}) => {

  return (
    <section id="banner">
      <div className="banner" style={{ backgroundImage: `linear-gradient(135deg, transparent, rgba(0,0,0, 0.5) 50%, rgba(0,0,0, 0.8)), url(${bgImage})` }}>
        <div className="info">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </section>
  )
}