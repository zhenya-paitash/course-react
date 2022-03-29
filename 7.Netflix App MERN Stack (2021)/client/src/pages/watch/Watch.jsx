import { ArrowBackOutlined } from "@material-ui/icons"
import { Link, useLocation } from "react-router-dom"
import "./watch.scss"

export default function Watch() {
  const location = useLocation()
  console.log(location)
  // const params = useParams()
  // console.log(params)

  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackOutlined />
          Home
        </div>
        <iframe
          className='video'
          title='vimeo'
          // src={
          //   movie
          //     ? movie.video
          //     : "https://player.vimeo.com/video/125188503?autoplay=1&muted=1&h=69df6eddfc&color=ffffff&title=0&byline=0&portrait=0"
          // }
          src='https://player.vimeo.com/video/125188503?autoplay=1&muted=1&h=69df6eddfc&color=ffffff&title=0&byline=0&portrait=0'
          frameBorder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          // allowFullScreen
        ></iframe>
      </Link>
    </div>
  )
}
