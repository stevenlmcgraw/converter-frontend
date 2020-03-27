import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveUpdatedFavoritesOrder } from '../../api_utility/ApiCalls';
import { getUserProfile } from '../../api_utility/ApiCalls';

class ManageFavoritesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //siteUser: null,
            favoritesList: [],
            selectedRowIds: [],
            draggingRowId: null,
            isLoading: false
        }

    }

    componentDidMount() {
        //const username = this.props.match.params.username;
        //console.log(username);
        //this.loadUserProfile(username);
        //console.log(this.state.siteUser);
        this.setState({
            favoritesList: this.props.siteUser.favoritesSet
        })
    }

    loadUserProfile = (username) => {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                siteUser: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            }
            else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    onDragEnd = result => {

        const { destination, source, reason } = result;

        if(!destination || reason === 'CANCEL') {
            this.setState({
                draggingRowId: null
            });
            return;
        }

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index) 
            {
                return;
            }

        const favoritesList = 
            Object.assign([], this.state.favoritesList);
        const formula = this.state.favoritesList[source.index];

        favoritesList.splice(source.index, 1);
        favoritesList.splice(destination.index, 0, formula);

        this.setState({
            favoritesList
        });
    }

    // saveOrder = () => {

    //     let { favoritesList } = this.state;
    //     let formulaIds = [];

    //     favoritesList.forEach(formula => {
    //         formulaIds.unshift(formula.id)
    //     });


    // }

    // getListStyle = isDraggingOver => {
    //     background: "success",
    //     padding: grid,
    //     width: auto
    // }

    render() {
        console.log('ManageFavoritesList');
        console.log(this.props.siteUser);

        return (
            <React.Fragment>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided, snapshot) =>(
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}

                    >
                        {this.state.favoritesList.map((formula, index) => (
                            <Draggable
                                key={formula.position}
                                draggableId={formula.position.toString()}
                                index={index}
                            >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    {formula.formulaName}
                                </div>
                            )}
                            </Draggable>
                        ))}
                            {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
            </React.Fragment>
        );
    }
}

export default ManageFavoritesList;