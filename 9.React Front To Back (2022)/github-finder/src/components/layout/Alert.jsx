import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

function Alert() {
  const { alert } = useContext(AlertContext)

  return alert && (
    <div
      className={`grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4`}
      style={{ visibility: alert ? 'visible' : 'hidden' }}
    >
      <div className='alert alert-error'>
        <div>
          <svg
            fill='none'
            viewBox='0 0 24 24'
            className='w-6 h-6 stroke-current mr-3'
          >
            <path
              stroke='#FFF'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 8l8 8M16 8l-8 8'
            ></path>
          </svg>
          <strong>{alert?.msg}</strong>
        </div>
      </div>
    </div>
  )
}

export default Alert
