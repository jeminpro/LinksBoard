import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/LinkleyStore';
import ConfigLinkMenu from './ConfigLinkMenu';
import LinkForm from './LinkForm';
import './styles/linkley.css';

class LinkItem extends Component {

    handleSave = values => {
        console.log(values)
        this.props.editLink(values);
    }

    render() {


        const { linkData, groupId } = this.props;
        const { url, name, description, isEdit } = linkData;

        const linkView = (
            <div>
                <a href={url} target="_blank" className="link">
                    <div>{name}</div>
                    {
                        typeof description !== 'undefined' ? <div className="small text-muted">{description}</div> : null
                    }
                </a>

                <ConfigLinkMenu linkData={linkData} groupId={groupId} />
            </div>
            );

        return (

            <div className="link-block">
                {isEdit ? <LinkForm  onSubmit={this.handleSave} />: linkView}
            </div>
        );
    }
}



export default connect(
    state => state.linkleyReducer,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(LinkItem);

