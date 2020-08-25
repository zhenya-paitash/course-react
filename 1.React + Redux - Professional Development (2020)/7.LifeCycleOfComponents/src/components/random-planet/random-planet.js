import React, {Component} from 'react';

import './random-planet.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";


export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = planet => {
    this.setState({planet, loading: false})
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const
      {planet, loading, error} = this.state,
      errorMessage = error ? <ErrorIndicator/> : null,
      spinner = loading ? <Spinner/> : null,
      content = !(loading || error) ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}


const PlanetView = ({planet}) => {
  const {
    id,
    name,
    population,
    rotationPeriod,
    diameter
  } = planet;

  return (
    <React.Fragment>
      <img className="planet-image" alt="somthing wrong"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span >
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
