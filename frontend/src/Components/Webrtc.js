import React, { useEffect } from 'react'
import { WebRTCAdaptor } from "https://cdn.skypack.dev/@antmedia/webrtc_adaptor@SNAPSHOT";

export default function Webrtc() {
    var streamId = "stream1"
    var webRTCAdaptor


    useEffect(() => {
        webRTCAdaptor = new WebRTCAdaptor({
            websocket_url: "wss://live.tentovision.com:5443/WebRTCAppEE/websocket",
            remoteVideoElement: document.getElementById("remoteVideo"),

            callback: (info, obj) => {
                console.log("callback info: " + info);
                if (info == "play_started") {
                    console.log("publish started");
                }
                else if (info == "play_finished") {
                    console.log("publish finished")

                }
            },

        });
    }, [])
    return (
        <div>
            <video id="remoteVideo" controls autoplay playsinline width="480" height="360"></video>
            <br />
            <button id="play_start" onClick={() => { webRTCAdaptor.play(streamId) }}>Start Playing</button>
            <button id="play_stop" onClick={() => { webRTCAdaptor.stop(streamId) }}>Stop Playing</button>
            <br />
        </div>
    )
}
