import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'

import { setCurrentUser } from './redux/actions/user'
import {auth, createUserProfileDocument} from './firebase/firebase-utils'
import { selectCurrentUser } from './redux/selectors'

import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import SignInSignUpPage from './pages/SignInSignUpPage/SignInSignUp'
import './App.css'


class App extends React.Component {
    

    unsubscribeFromAuth = null

    componentDidMount() {
      const { setCurrentUser } = this.props
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth)
          
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })
          })
        } else {
          setCurrentUser(userAuth)
        }

        
      })
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth()
    }
    
    render(){
      return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
          exact 
          path='/signin' 
          render={() => this.props.currentUser ? (
          <Redirect to='/' />
          ) : (
          <SignInSignUpPage />
          )}/> />

        </Switch>
    </div>
      )
    }
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => {
    return dispatch(setCurrentUser(user))
  }
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
