import React from 'react'
import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButton/CustomButton'
import {auth, signInWithGoogle} from '../../firebase/firebase-utils'
import './style.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const {email, password} = this.state
        console.log(email)
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (err) {
            console.error(err)
        }
        this.setState({email: '', password: ''})
         if (document && document.activeElement) document.activeElement.blur()
        
    }

    handleChange = (e) => {
        const {value, name} = e.target
        this.setState({[name]: value})
    }  

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    type='email' 
                    name='email' 
                    value={this.state.email}
                    handleChange={this.handleChange}
                    label='Email'
                    required
                    />
                    
                    <FormInput 
                    type='password' 
                    name='password' 
                    value={this.state.password}
                    handleChange={this.handleChange}
                    label='Password'
                    required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )

    }
    
    
}


export default SignIn