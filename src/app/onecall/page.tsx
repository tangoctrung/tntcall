'use client'

import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const OneCall = () => {
    const [socket] = useState(() => io('http://localhost:8000'));
    const localVideoRef = useRef<any>(null);
    const remoteVideoRef = useRef<any>(null);
    const peerConnectionRef = useRef<any>(null);
    const localStreamRef = useRef<any>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' } // STUN server của Google
        ]
    };

    useEffect(() => {
        // Lấy stream từ camera của người dùng
        const startLocalStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (!localStreamRef.current || !localVideoRef.current) return;
                localVideoRef.current.srcObject = stream;
                localStreamRef.current = stream;
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        startLocalStream();

        // Khởi tạo peer connection
        peerConnectionRef.current = new RTCPeerConnection(configuration);

        // Khi nhận ICE candidate từ trình duyệt, gửi nó đến peer qua socket
        peerConnectionRef.current.onicecandidate = (event: any) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate);
            }
        };

        // Khi nhận stream từ peer, hiển thị nó trên remote video
        peerConnectionRef.current.ontrack = (event: any) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // Nhận offer từ peer
        socket.on('offer', async (offer) => {
            if (!peerConnectionRef.current) return;
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socket.emit('answer', answer);
        });

        // Nhận answer từ peer
        socket.on('answer', async (answer) => {
            if (!peerConnectionRef.current) return;
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        // Nhận ICE candidate từ peer và thêm nó vào peer connection
        socket.on('candidate', async (candidate) => {
            if (!peerConnectionRef.current) return;
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        });

        return () => {
            // Clean up connection khi component bị unmount
            peerConnectionRef.current && peerConnectionRef.current.close();
            socket.disconnect();
        };
    }, [configuration, socket]);

    const startCall = async () => {
        // Thêm tracks từ local stream vào peer connection
        if (!localStreamRef.current) return;
        localStreamRef.current.getTracks().forEach((track: any) => {
            peerConnectionRef.current.addTrack(track, localStreamRef.current);
        });

        // Tạo offer và gửi qua signaling server
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit('offer', offer);
    };

    return (
        <div>
            <h1>WebRTC Video Chat</h1>
            <div>
                <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
                <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '300px', height: '200px', border: '1px solid black' }} />
            </div>
            <button onClick={startCall}>Start Call</button>
        </div>
    );
};

export default OneCall;
