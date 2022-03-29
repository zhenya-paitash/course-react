import { ArrowBackOutlined } from "@material-ui/icons"
import "./watch.scss"

export default function Watch() {
  return (
    <div className='watch'>
      <div className='back'>
        <ArrowBackOutlined />
        Home
      </div>
      {/* <video
        className='video'
        // autoPlay
        // progress
        // controls
        // src='https://vod-progressive.akamaized.net/exp=1624452918~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2400%2F14%2F362003850%2F1486625955.mp4~hmac=d6f829e7bb83f1ee6a28047d00aa2c1083c8fe5036c8084a4adf1c3903085856/vimeo-prod-skyfire-std-us/01/2400/14/362003850/1486625955.mp4'
      /> */}
      <iframe
        className='video'
        title='vimeo'
        src='https://player.vimeo.com/video/125188503?autoplay=1&muted=1&h=69df6eddfc&color=ffffff&title=0&byline=0&portrait=0'
        frameBorder='0'
        allow='autoplay; fullscreen; picture-in-picture'
        // allowFullScreen
      ></iframe>
    </div>
  )
}
