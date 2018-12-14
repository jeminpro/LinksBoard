import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/LinkleyStore';
import { Button, Modal } from 'react-bootstrap';
import LinkForm from './LinkForm';
import './styles/linkley.css';

class AddEditLink extends Component {
    constructor(props) {
        super(props);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeAddLink();
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSave = values => {
        console.log(values)
        this.props.addLink(this.props.selectedGroupId, values);
    }

    render() {
        return (
            <Modal show={this.props.showAdd} onHide={this.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Add link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LinkForm onSubmit={this.handleSave} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default connect(
    (state) => { return state.linkleyReducer },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddEditLink);
