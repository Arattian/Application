import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/loginAction';
import './Login.css';
class Login extends React.Component {

    submit = (ev) => {
        const {mail, pass} = this.refs;
        this.props.handleLogin(mail, pass);
        ev.preventDefault();
    }

    shouldComponentUpdate() {
        if (localStorage.token !== 'undefined') {
            this.props.history.push('/admin');
            return false;
        } else {
            return true;
        }
    }
    
    render() {
        return (
            <div className='form-container'>
                <form className='login-form' onSubmit={this.submit}>
                    <h2>Admin Panel</h2>
                    <div className='input-container'>
                        <i className='fa fa-envelope icon'></i>
                        <input 
                            className='input-field'
                            type='email'
                            placeholder='Email'
                            name='mail'
                            ref='mail'
                            required
                        />
                    </div>
                    <div className='input-container'>
                        <i className='fa fa-key icon'></i>
                        <input 
                            className='input-field'
                            type='password'
                            placeholder='Password'
                            name='psw'
                            ref='pass'
                            required
                        />
                    </div>
                    <button type='submit' className='btn'>Login</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.login.loggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (mail, pass) => dispatch(login(mail, pass)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));