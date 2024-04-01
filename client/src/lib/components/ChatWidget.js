import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useRef, useState, useEffect } from "react";
import "./ChatWidget.scss";

function ChatWidget(props) {
    const IFrameRef = useRef(null);
    
    const [receivedMsg, setReceivedMsg] = useState("");
    
    useEffect(() => {
      window.addEventListener("message", function (e) {
        if (!IFrameRef.current) return;
        if (props.provider == null) return; 
        IFrameRef.current.contentWindow.postMessage({address: props.provider.selectedAddress, network: Number(props.provider.chainId), accessToken: props.accessToken}, "*");
      });
    })
    

    const popover = (
        <Popover className="popover" id="popover-basic">
            <Popover.Body className="popover-body">
                <div className="iframe">
                    <iframe
                        ref={IFrameRef}
                        width="300"
                        height="550px"
                        src={"https://chat-client.highfi.me/?accessToken=" + props.accessToken}
                    ></iframe>
                </div>
            </Popover.Body>
        </Popover>
    );
    const Example = () => (
        console.log(props.accessToken),
        (
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <button className="button" type="button" variant="success">
                    <FontAwesomeIcon icon={faComments} color="white" />
                </button>
            </OverlayTrigger>
        )
    );

    return (
        <div>
            <div>
                <Example/>
            </div>
        </div>
    );
}

export default ChatWidget;
