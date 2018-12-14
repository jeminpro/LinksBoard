import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';
import Group from './Group';
import GroupForm from './GroupForm';
import './styles/linkley.css';

class Linkley extends Component {

    componentWillMount() {
        this.props.requestLinks();
    }

    shwAddGroupFormHandler() {
        this.props.shwAddGroupForm();
    }

    handleSave = values => {
        this.props.addGroup(values);
    }

    render() {

        const addGroupButton = <div className="btn btn-add" onClick={() => this.shwAddGroupFormHandler()}>+ Add New group</div>
        const groupForm = <GroupForm onSubmit={this.handleSave}  />

        return (
            <div className="links-container">
                <h1 className="heading">Links Board</h1>
                {
                    this.props.linksData.map(group => (
                        <Group key={group.groupId} group={group} onClick={this.props.addLink} />
                    ))                    
                }
                {
                    <div className="card">
                        <div className="card-body">
                            {this.props.isAddGroup ? groupForm : addGroupButton}
                        </div>
                    </div>
                }
            </div>
        );
    }
}


export default connect(
    state => state.linkleyReducer,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Linkley);
