import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    ModalHeader, ModalBody, Modal,
    Form, FormGroup, Label, Input, FormText, 
    ModalFooter, ListGroup, ListGroupItem, Table
  } from 'reactstrap';
  import "bootswatch/dist/flatly/bootstrap.min.css";

  class Result extends React.Component {
      constructor(props) {
          super(props);

      }

      render() {
          const calcAttrs = this.props.resultHistory.calculationAttributes;
          const getCalcAttrs = Object.keys(this.props.resultHistory.calculationAttributes)
          .map((key) => 
            <tr>
                <td value={key}>{key}</td>
                 <td>{calcAttrs[key]}</td>
            </tr>
            );
          
          return (
              <div>
                <React.Fragment>
                <ListGroup>
                    <ListGroupItem>{this.props.resultHistory.title}</ListGroupItem>
                    <ListGroupItem>{this.props.resultHistory.message}</ListGroupItem>
                    <ListGroupItem>{this.props.resultHistory.entryDate}</ListGroupItem>
                    <ListGroupItem>
                        <Table>
                            <thead>
                                <tr>
                                <th>Variable</th>
                                <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {getCalcAttrs}
                            </tbody>
                        </Table>
                    </ListGroupItem>
                </ListGroup>
                </React.Fragment>
              </div>
          )
      }
  }

  export default Result;