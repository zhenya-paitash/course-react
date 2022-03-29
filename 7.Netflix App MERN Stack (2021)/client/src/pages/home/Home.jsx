import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import "./home.scss"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = ({ type }) => {
  const [lists, setListsts] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkMWY1NDllNzVjNThkNDQ0NmQ0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODU1MTY0NCwiZXhwIjoxNjQ4NjM4MDQ0fQ.QQMZwBPsC37A3_y3R3LeyuF7UE654pWCpR3wNzGo1KM",
            },
          }
        )
        // console.log(res)
        setListsts(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getRandomLists()
  }, [type, genre])

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists.map((i, idx) => (
        <List list={i} key={idx} />
      ))}
    </div>
  )
}

export default Home
