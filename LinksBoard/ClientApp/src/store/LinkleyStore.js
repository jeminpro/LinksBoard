const REQUEST = 'REQUEST';
const RESPONSE = 'RESPONSE';
const SHOW_ADD_LINK = 'SHOW_ADD_LINK';
const CLOSE_ADD_LINK = 'CLOSE_ADD_LINK';
const EDIT_FORM = 'EDIT_FORM';
const CANCEL_FORM = 'CANCEL_FORM';
const SHOW_ADD_GROUP = 'SHOW_ADD_GROUP';
const CANCEL_GROUP_FORM = 'CANCEL_GROUP_FORM';
const SHOW_EDIT_GROUP = 'SHOW_EDIT_GROUP';

export const actionCreators = {
    requestLinks: () => async (dispatch, getState) => {

        dispatch({ type: REQUEST });

        const url = `/Links/GetLinks`;

        fetch(url)
            .then(function (response) {

                return response.json();
            })
            .then(function (linksData) {
                dispatch({ type: RESPONSE, payLoad: linksData });
            });


    },
    showAddLink: (groupId) => ({
        type: SHOW_ADD_LINK,  groupId: groupId 
    }),
    closeAddLink: () => ({
        type: CLOSE_ADD_LINK
    }),
    addLink: (linkData) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });

        const url = `/Links/AddLink`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(linkData)
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.closeAddLink());
            });
    },
    editLink: (linkData) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });
       
        const url = `/Links/EditLink`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(linkData)
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.closeAddLink());
            });
    },
    deleteLink: (linkId, groupId) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });

        let postData = { linkId: linkId, groupId: groupId };

        const url = `/Links/DeleteLink`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.closeAddLink());
            });
    },
    editForm: (formData, groupId) => ({        
        type: EDIT_FORM, formData, groupId
    }),
    cancelForm: (linkId, groupId) => ({
        type: CANCEL_FORM, linkId, groupId
    }), 
    shwAddGroupForm: () => ({
        type: SHOW_ADD_GROUP
    }),
    shwEditGroupForm: (groupItem) => ({
        type: SHOW_EDIT_GROUP, groupItem
    }),
    cancelGroupForm: () => ({
        type: CANCEL_GROUP_FORM
    }),
    addGroup: (groupData) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });

        const url = `/Links/AddGroup`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.cancelGroupForm());
            });
    },
    editGroup: (groupData) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });

        const url = `/Links/EditGroup`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.cancelGroupForm());
            });
    },
    deleteGroup: (groupId) => async (dispatch, getState) => {
        dispatch({ type: REQUEST });

        const url = `/Links/DeleteGroup`;

        fetch(url,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ groupId })
            })
            .then(response => {
                dispatch(actionCreators.requestLinks());
                dispatch(actionCreators.closeAddLink());
            });
    }
};


const initialState = {
    linksData: [],
    selectedGroupId: null,
    isLoading: false,
    formData: {},
    groupFormData: {},
    isAddGroup: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    console.log(action.type);

    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case RESPONSE:
            return {
                ...state,
                linksData: action.payLoad,
                isLoading: false
            };

        case SHOW_ADD_LINK:
            let newAddLinksData = state.linksData.map(group => {
                if (group.groupId === action.groupId) {
                    return { ...group, isAddMode: true };
                }
                return group;
            });


            return {
                ...state
                , linksData: newAddLinksData
                , formData: { groupId: action.groupId, linkId: null }
            };
          
        case CLOSE_ADD_LINK:
            return {
                ...state,
                showAdd: false

            };
        case EDIT_FORM:
            let newLinksData = state.linksData.map(group => {
                let gi = group;
                if (group.groupId === action.groupId) {
                    gi.links = group.links.map(link => {
                        if (link.linkId === action.formData.linkId) {
                            link = { ...link, isEdit: true }
                        }
                        return link;
                    });
                }
                return gi;
            });
            
            return {
                ...state,
                linksData: [...newLinksData],
                formData: action.formData

            };
        case CANCEL_FORM:
            let newCancelLinksData = state.linksData.map(group => {
                let gi = group;
                if (group.groupId === action.groupId) {

                    if (action.linkId) {
                        gi.links = group.links.map(link => {
                            if (link.linkId === action.linkId) {
                                link = { ...link, isEdit: false }
                            }
                            return link;
                        });
                    }
                    else {
                        group.isAddMode = false;
                    }                    
                }
                return gi;
            });

            return {
                ...state,
                linksData: [...newCancelLinksData],
                formData: {}

            };
        case SHOW_ADD_GROUP:

            return {
                ...state,
                groupFormData: {},
                isAddGroup: true
            };
        case SHOW_EDIT_GROUP:

            let newEditGroupData = state.linksData.map(group => {
                group.isEditGroup = (group.groupId === action.groupItem.groupId);
                return group;
            });

            return {
                ...state,
                groupFormData: action.groupItem,
                linksData: newEditGroupData
            };
        case CANCEL_GROUP_FORM:

            if (!action.groupId) {
                return {
                    ...state,
                    isAddGroup: false
                }
            }

            let newCancelGroupData = state.linksData.map(group => {
                if (group.isEditGroup === action.groupId) {
                    group.isEditGroup = false;
                }
                return group;
            });

            return {
                ...state,
                linksData: newCancelGroupData,
                groupFormData: {}

            };
        default:
            return state;
    }
};
