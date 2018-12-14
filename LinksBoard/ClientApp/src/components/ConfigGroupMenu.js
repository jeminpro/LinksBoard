import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';
import './styles/linkley.css';

class ConfigGroupMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayGroupMenu: false,
        }

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayGroupMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        })
    }

    hideDropdownMenu() {
        this.setState({ displayGroupMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        })
    }

    handleEdit(groupItem) {
        console.log('groupItem', groupItem)
        this.props.shwEditGroupForm(groupItem);

    }

    handleDelete(groupItem) {
        this.props.deleteGroup(groupItem.groupId);
    }

    render() {
        const { groupItem } = this.props;

        return (

            <span className="config ">
                <div className="button" onClick={this.showDropdownMenu}>
                    <span className="glyphicon glyphicon-option-vertical" />
                </div>
                {this.state.displayGroupMenu ?
                    (<ul>
                        <li onClick={() => this.handleEdit(groupItem)}>Edit</li>
                        <li onClick={() => this.handleDelete(groupItem)}>Delete</li>
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
)(ConfigGroupMenu);
