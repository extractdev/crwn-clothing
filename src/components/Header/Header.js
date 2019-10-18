import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'

import { selectCurrentUser, selectCartHidden } from '../../redux/selectors'
import { auth } from '../../firebase/firebase-utils'

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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)