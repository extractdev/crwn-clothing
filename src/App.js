import React from 'react'
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import SignInSignUpPage from './pages/SignInSignUpPage/SignInSignUp'
import { setCurrentUser } from './redux/user/actions'
import {auth, createUserProfileDocument} from './firebase/firebase-utils'
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
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUpPage} />
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

export default connect(null,mapDispatchToProps)(App)
