import PropTypes from 'prop-types'

const Button = ({ children, version, type, disabled }) => (
  <button
    className={`btn btn-${version}`}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.defaultProps = {
  // version: 'primary',
  version: 'secondary',
  type: 'button',
  disabled: false,
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Button
