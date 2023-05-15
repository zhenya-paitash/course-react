import SpinnerImg from './assets/spinner.gif'

const Spinner = () => (
  <div className="w-100 mt-20">
    <img
      src={SpinnerImg}
      alt="loading..."
      width={180}
      className='text-center mx-auto'
    />
  </div>
)

export default Spinner
