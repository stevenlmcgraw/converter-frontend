import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveUpdatedFavoritesOrder, deleteFormulaFromFavoritesList } from '../../api_utility/ApiCalls';
import { notification } from 'antd';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import "bootswatch/dist/flatly/bootstrap.min.css";

class ManageFavoritesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesList: [],
            selectedRowIds: [],
            draggingRowId: null,
            isLoading: false
        }

    }

    componentDidMount() {
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
    }

    removeFave = (event, formulaName) => {
        event.preventDefault();

        const newList = this.state.favoritesList
        .filter(formula =>
            formula.formulaName !== formulaName
        );

        console.log('removeFave');
        console.log(newList);

        this.setState({
            favoritesList: newList
        });

        console.log(this.state.favoritesList);

        this.saveOrder();
    }

    onClickRemove = (event, formulaName) => {
        event.preventDefault();

        console.log('onClickRemove()');
        console.log(formulaName);

        deleteFormulaFromFavoritesList(this.props.siteUser.username,
            formulaName)
        .then(() => {
            notification.success({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Formula removed from your favorites!'
            });
            this.saveOrder();
        }).catch(error => {
            notification.error({
                message: 'Saturn Hotdog Super Calculator',
                description: 'Oh no!!! Something went wrong - give it another go yo.' 
                || error.message
            });
        });
    }

    // getListStyle = isDraggingOver => {
    //     background: "success",
    //     padding: grid,
    //     width: auto
    // }

    render() {

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
                                <span>
                                    {formula.displayName}
                                    <span>
                                    <IconButton 
                                        onClick={(event) => 
                                            this.removeFave(event, formula.formulaName)}
                                        edge={'end'}>
                                        <RemoveIcon />
                                    </IconButton>
                                    </span>
                                </span>
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