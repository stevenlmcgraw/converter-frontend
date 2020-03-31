import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveUpdatedFavoritesOrder } from '../../api_utility/ApiCalls';
import { notification } from 'antd';
import "bootswatch/dist/flatly/bootstrap.min.css";

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
            favoritesList: this.props.siteUser.favoritesList
        })
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

        this.saveOrder();
    }

    saveOrder = () => {

        let { favoritesList } = this.state;
        let formulaPositions = [];

        favoritesList.forEach(formula => {
            formulaPositions.unshift(formula.formulaName)
        });

        saveUpdatedFavoritesOrder(this.props.siteUser.username, formulaPositions)
        .then(() => {
            notification.success({
                message: 'Saturn Hotdog Super Calculator',
                description: 'New Order of Favorites Successful!'
            });
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Calculator',
                description: error.message || 
                'Apologies, but something went awry. Try again please.'
            });
        });

        console.log('saveOrder()');
        console.log(this.props.username);
        console.log(favoritesList);
        console.log(formulaPositions);
    }

    // getListStyle = isDraggingOver => {
    //     background: "success",
    //     padding: grid,
    //     width: auto
    // }

    render() {
        console.log('ManageFavoritesList');
        console.log(this.props.siteUser);
        console.log(this.props);

        return (
            <React.Fragment>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided) =>(
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}

                    >
                        {this.state.favoritesList.map((formula, index) => (
                            <Draggable
                                key={formula.formulaName}
                                draggableId={formula.formulaName}
                                index={index}
                            >
                            {(provided) => (
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