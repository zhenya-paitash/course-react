import React from 'react'

export default props => (
  <div>
    <h3>Сar name: {props.name}</h3>
    <p>Year: <strong>{props.year}</strong></p>
    { props.children }
  </div>
)