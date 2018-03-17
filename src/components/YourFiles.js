/**
 * Created by cbuonocore on 3/16/18.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import api from "../helpers/api";
import FileDetails from "./FileDetails";

const YourFiles = createReactClass({

    componentWillMount() {
        this.setState({
            address: "",
            files: null,
            loading: false,
            currentAddress: "",
            currentKey: "",
            showModal: false,
        });
    },

    handleChange(e) {
        this.setState({ address: e.target.value });
    },

    handleClose() {
        this.setState({showModal: false});
    },

    selectFile(metadata) {
        console.log('selectFile', JSON.stringify(metadata));
        this.setState({currentMetadata: metadata, showModal: true});
    },

    search() {
        const self = this;
        self.setState({loading: true});
        const address = this.state.address;
        console.log('searching files with address', address);

        // TODO: implement query.
        let result;
        if (address === api.TEST_DEMO_ADDRESS) {
            result = [api.createTestMetaData(api.TEST_FILE_NAME, api.TEST_DEMO_ADDRESS)]
        } else {
            result = [];
        }
        this.setState({files: result, loading: false, currentAddress: address});
    },

    download() {
        // TODO: implement
        console.log('download')
    },

    handleAddressChange(e) {
        this.setState({ address: e.target.value });
    },

    handleKeyChange(e) {
        this.setState({ currentKey: e.target.value });
    },

    getValidationState() {
        const length = this.state.address.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    },

    render() {
        const self = this;
        const files = self.state.files;
        const metadata = self.state.currentMetadata;

        return (
            <div className="centered files-page">

                <h1>Your Files</h1>
                <p>Enter arbitrary address below to fetch Encoded files for that address</p>

                <p>Once these files are shown below, unlock them using your original key,
                    or a proxy key provisioned by the original file owner</p>

                <FormGroup
                    validationState={this.getValidationState()}
                    controlId="formBasicText">
                    <ControlLabel>Enter your address</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.address}
                        placeholder="Enter Public Address"
                        onChange={this.handleAddressChange}
                    />
                    <FormControl.Feedback />

                    <Button bsStyle="success" className="search-button" onClick={() => this.search()}>Search</Button>
                </FormGroup>


                <hr/>

                {files !== null && files.map((file) => {
                    return <div className="file-block" onClick={() => self.selectFile(file)}>
                        <FileDetails file={file}/>
                    </div>
                })}

                {files !== null && ! files.length && <p className="no-results centered">No files found for <b>{self.state.currentAddress}</b></p>}

                {/*TODO: make this a shareable modal between here and FileChain*/}
                <Modal show={self.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Blockchain Metadata File</Modal.Title>
                    </Modal.Header>
                    < Modal.Body >
                        <FileDetails file={metadata}/>
                        <hr/>

                        <Button bsStyle="info">Grant Access</Button>
                        <HelpBlock>Is this your file? Grant Access to other users by clicking here.</HelpBlock>

                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Enter your authorized key to download</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.privateKey}
                                placeholder="Enter key"
                                onChange={this.handleKeyChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" onClick={this.download}>Download</Button>
                        <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                        {/*<Button bsStyle="danger" onClick={this.handleClose}>Grant Access</Button>*/}
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});

export default YourFiles;

