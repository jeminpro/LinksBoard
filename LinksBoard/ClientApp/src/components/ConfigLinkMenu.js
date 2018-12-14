import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';
import './styles/linkley.css';

class ConfigLinkMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayMenu: false,
        }

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        })
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        })
    }

    handleEdit(groupId, linkData) {
        this.props.editForm({ ...linkData, groupId: groupId }, groupId);

        //this.props.showAddLink(groupId);
    }

    handleDelete(linkId, groupId) {
        this.props.deleteLink(linkId, groupId);
    }

    render() {
        const { linkData, groupId } = this.props;

        return (

            <span className="config ">
                <div className="button" onClick={this.showDropdownMenu}>
                    <span className="glyphicon glyphicon-option-vertical" />
                </div>
                {this.state.displayMenu ?
                    (<ul>
                        <li onClick={() => this.handleEdit(groupId, linkData)}>Edit</li>
                        <li onClick={() => this.handleDelete(linkData.linkId, groupId)}>Delete</li>
                    </ul>)
                    : null
                }
            </span>

        )
    }
}


export default connect(
    state => state.linkleyReducer,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ConfigLinkMenu);
