import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';
import LinkItem from './LinkItem';
import ConfigGroupMenu from './ConfigGroupMenu'
import GroupForm from './GroupForm'

import './styles/linkley.css';
import LinkForm from './LinkForm';

class Group extends Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(groupId) {
        this.props.showAddLink(groupId);
    }

    handleSave = values => {
        this.props.addLink(values);
    }

    handleEditSaveGroup = values => {
        this.props.editGroup(values);
    }

    render() {
        return (
            <div className="card">
                {
                    this.props.group.isEditGroup ?
                        <GroupForm onSubmit={this.handleEditSaveGroup} />
                        :
                        <div className="card-header">
                            <span>{this.props.group.groupName}</span>
                            <ConfigGroupMenu groupItem={this.props.group} />
                        </div>
                }
                <div className="card-body">
                    {
                        this.props.group.links?
                            this.props.group.links.map((link, index) => (
                                <LinkItem key={link.linkId} linkData={link} groupId={this.props.group.groupId} />
                            ))
                            : null
                    
                    }

                    {
                        this.props.group.isAddMode ? <LinkForm onSubmit={this.handleSave} /> : <div className="btn btn-add" onClick={() => this.handleAdd(this.props.group.groupId)}>(+)</div>
                    }
                    
                </div>
            </div>
        );
    }
}



export default connect(
    state => state.linkleyReducer,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Group);
