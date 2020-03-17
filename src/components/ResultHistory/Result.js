import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    ModalHeader, ModalBody, Modal,
    Form, FormGroup, Label, Input, FormText, 
    ModalFooter, ListGroup, ListGroupItem
  } from 'reactstrap';

  class Result extends React.Component {
      constructor(props) {
          super(props);

      }

      render() {
          const calcAttr = ([this.props.resultHistory.calculationAttributes])
          .map((attribute, index) =>
                <ListGroupItem key={index}>Variable: {attribute.key}</ListGroupItem>
            )

          
          return (
              <div>
                <React.Fragment>
                <ListGroup>
                    <ListGroupItem>Title: {this.props.resultHistory.title}</ListGroupItem>
                    <ListGroupItem>Description: {this.props.resultHistory.message}</ListGroupItem>
                    <ListGroupItem>Date: {this.props.resultHistory.entryDate}</ListGroupItem>
                    <ListGroupItem>{calcAttr}</ListGroupItem>
                </ListGroup>
                </React.Fragment>
              </div>
          )
      }
  }

  export default Result;