import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './DrillModePage_master.css'

const DrillModePage = () => {

    const [showResult, setShowResult] = useState(false)

    return (
        <div className="drill-mode-container">
            <div className="text-visualization">
                <span>Text Visualization Section</span>
            </div>
            <p>Left Hand, Index Finger</p>
            <div className="keyboard-visualization">
                <span>Keyboard Visualization Section</span>
            </div>
            <Modal show={showResult} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header style={{display: "flex", justifyContent: "center"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User Performance Result
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h4>Typing Speed</h4>
                    <p>70 Words per Minute</p>
                    <hr className="my-4" />
                    <h4>Typing Accuracy</h4>
                    <p>97.5 Percent</p>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => {setShowResult(false)}} style={{width: "30%"}}>Return to Practice Page</Button>
                    <Button onClick={() => {setShowResult(false)}} style={{width: "30%"}}>Return to Main Menu</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DrillModePage