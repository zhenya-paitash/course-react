import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons"
import "./listItem.scss"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Listitem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false)
  const [movie, setMovie] = useState({})
  // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`/movie/${item}`, {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkMWY1NDllNzVjNThkNDQ0NmQ0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODU1MTY0NCwiZXhwIjoxNjQ4NjM4MDQ0fQ.QQMZwBPsC37A3_y3R3LeyuF7UE654pWCpR3wNzGo1KM",
          },
        })
        setMovie(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getMovie()
  }, [item])

  return (
    <Link to={{ pathname: "/watch" }}>
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          // src={item.img || 'https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee'}
          src={movie?.imgSm}
          alt=''
        />

        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span>{movie.duration}</span>
                <span className='limit'>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.description}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
