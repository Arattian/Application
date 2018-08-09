import React from 'react';
import { withRouter } from 'react-router-dom';
import { addTeacher } from '../../../actions/addAction';
import { editAction } from '../../../actions/editAction';
import { connect } from 'react-redux';
import { getCurrentData, dropCurrentData } from '../../../actions/totalDataAction';
import '../Forms.css';

class TeacherForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            age: '',
        }
    }

    handleInputChange = (ev, fieldToChange) => {
        switch(fieldToChange) {
            case 'firstname': {
                this.setState({firstname: ev.target.value});
                break;
            }
            case 'lastname': {
                this.setState({lastname: ev.target.value});
                break;
            }
            case 'age': {
                this.setState({age: ev.target.value});
                break;
            }
            default:
        }
    }

    handleSubmit = (ev, data, andClose) => {
        if(this.state.firstname !== '' &&
            this.state.lastname !== '' &&
            this.state.age !== '' &&
            this.state.classId !== '') {
                this.state.id ? 
                this.props.boundEditAction(data, data.id, 'teachers') :
                this.props.boundAddTeacher(data);
                andClose && this.props.history.push(`/admin/teachers`);
    }
        ev.preventDefault();        
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        id && this.props.boundGetCurrentData(id);
    }

    componentDidUpdate() {
        if(this.props.currentData) {
            this.setState({
                id: this.props.currentData.id,
                firstname: this.props.currentData.firstname,
                lastname: this.props.currentData.lastname,
                age: this.props.currentData.age,
            });
            this.props.boundDropCurrentData();
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
                    <button type='submit' className='forms-btn'>{this.state.id ? 'Save' : 'Add Teacher'}</button>
                    <button className='forms-btn' onClick={(ev) => this.handleSubmit(ev, this.state, true)}>{this.state.id ? 'Save and Close' : 'Add and Close'}</button>
                </div>
            </form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentData: state.totalData.currentData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        boundEditAction: (data, id, editFrom) => dispatch(editAction(data, id, editFrom)),
        boundAddTeacher: (data) => dispatch(addTeacher(data)),
        boundGetCurrentData: (id) => dispatch(getCurrentData(id, 'teachers')),
        boundDropCurrentData: () => dispatch(dropCurrentData()),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherForm));