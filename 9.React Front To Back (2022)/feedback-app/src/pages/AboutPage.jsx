import { useNavigate } from "react-router-dom"
import Card from "../components/shared/Card"

const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Version: 1.0.0</p>

        <p>
          {/* <Link to="/">Back To Home</Link> */}
          <button 
            className="btn btn-secondary"
            onClick={e => navigate('/')}
          >Back To Home</button>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
