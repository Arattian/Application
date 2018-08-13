import React from 'react';
import './TeacherForm.css';

class TeacherForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
            firstname: '',
            lastname: '',
            age: '',
        }
    }

    handleInputChange = (ev, fieldToChange) => {
        this.setState({[fieldToChange]: ev.target.value});
    }

    validateInput = () => {
        return this.state.firstname !== '' &&
                this.state.lastname !== '' &&
                this.state.age !== '' &&
                this.state.classId !== '';
    }

    handleSubmit = (ev, data, redirect) => {
        if(this.validateInput()) {
                if(this.state.id) {
                    this.props.onSubmit(data, data.id, 'teachers');
                    redirect && this.props.closeForm('teachers'); 
                } else if (redirect) {
                    this.props.onSubmit(data, 'teachers', redirect);
                } else {
                    this.props.onSubmit(data, 'teachers');
                    this.setState({
                        firstname: '',
                        lastname: '',
                        age: '',
                    });
                }
    }
        ev.preventDefault();        
    }

    componentDidUpdate() {
        if(this.props.currentItem && !this.state.id) {
            this.setState({
                id: this.props.currentItem.id,
                firstname: this.props.currentItem.firstname,
                lastname: this.props.currentItem.lastname,
                age: this.props.currentItem.age,
            });
        }
    }

    render() {
        const {closeForm} = this.props;
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev, this.state)} className='forms-form'>
                <header className='forms-header'>
                    <h2>Teacher</h2>
                </header>
                <div className='forms-input-container'>
                    <label htmlFor='teacher-firstname'>
                        <h4>First Name*</h4>
                    </label>
                    <input 
                        className='forms-input-field'
                        type='text'
                        placeholder='Enter First Name'
                        name='firstname'
                        id='teacher-firstname'
                        pattern='[\p{L}]+'
                        value={this.state.firstname}
                        onChange={(ev) => this.handleInputChange(ev, 'firstname')}
                        required
                        />
                </div>
                <div className='forms-input-container'>
                    <label htmlFor='teacher-lastname'>
                        <h4>Last Name*</h4>
                    </label>
                    <input 
                        className='forms-input-field'
                        type='text'
                        placeholder='Enter Last Name'
                        name='lastname' 
                        id='teacher-lastname'
                        pattern='[\p{L}]+'
                        value={this.state.lastname}
                        onChange={(ev) => this.handleInputChange(ev, 'lastname')}
                        required
                        />
                </div>
                <div className='forms-input-container'>
                    <label htmlFor='teacher-age'>
                        <h4>Age*</h4>
                    </label>
                    <input 
                        className='forms-input-field'
                        type='number'
                        placeholder='Enter Age'
                        name='age'
                        id='teacher-age'
                        min='20'
                        max='80'
                        value={this.state.age}
                        onChange={(ev) => this.handleInputChange(ev, 'age')}
                        required
                    />
                </div>
                <div className='forms-btn-container'>
                    <button className='forms-btn' onClick={() => closeForm('teachers')}>Close</button>
                    <button type='submit' className='forms-btn'>{this.state.id ? 'Save' : 'Add and Create New'}</button>
                    <button className='forms-btn' onClick={(ev) => this.handleSubmit(ev, this.state, true)}>{this.state.id ? 'Save and Close' : 'Add Teacher'}</button>
                </div>
            </form>
        );
    }
}

export default TeacherForm;