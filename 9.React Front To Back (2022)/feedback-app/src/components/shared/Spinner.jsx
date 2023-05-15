import spinner from  '../assets/spinner.gif'

const Spinner = () => <img
  src={spinner}
  alt='loading...'
  style={{
    width: '100px',
    height: '100px',
    margin: 'auto',
    display: 'block'
  }}
/>

export default Spinner
