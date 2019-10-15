import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase-utils'
import { connect } from 'react-redux'
import CartIcon from '../CartIcon/CartIcon'
import CartDropdown from '../CartDropdown/CartDropdown'

import './style.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg'

const Header = ({ currentUser, cartHidden }) => (
    <div className='header'>
        <div className='logo-container'>
            <Link to='/'>
                <Logo className='logo'/>
            </Link>
        </div>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
                :
                <Link to='/signin' className='option'>
                SIGN IN
                </Link>
            }
            <CartIcon />
        </div>

        {!cartHidden &&  <CartDropdown />}
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cartHidden: state.cart.cartHidden
})

export default connect(mapStateToProps)(Header)