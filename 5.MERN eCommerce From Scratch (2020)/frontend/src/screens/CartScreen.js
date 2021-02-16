import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, history, location }) => {
  const dispatch = useDispatch()

  const productId = match.params.id
  const qty = location.search ? Number(location.search.split`=`[1]) : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}

export default CartScreen
