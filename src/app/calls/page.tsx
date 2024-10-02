'use client'
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Calls = () => {
    const [peers, setPeers] = useState<any[]>([]);
    const [myStream, setMyStream] = useState<any>(null);
    const socketRef = useRef<any>(null);
    const peersRef = useRef<any[]>([]);
    const roomId = '12345'; // Có thể lấy từ URL hoặc tự tạo
    const localVideoRef = useRef<any>(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:8000');
        const startLocalStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setMyStream(stream);
            localVideoRef.current.srcObject = stream;

            socketRef.current.emit('join-room', roomId, socketRef.current.id);

            socketRef.current.on('user-connected', (userId: string) => {
                const peer = createPeer(userId, socketRef.current.id, stream);
                peersRef.current.push({
                    peerId: userId,
                    peer,
                });

                console.log({ peersRefCurrent: peersRef.current });
                setPeers([...peersRef.current]);
            });

            socketRef.current.on('offer', handleReceiveCall);
            socketRef.current.on('answer', handleAnswer);
            socketRef.current.on('candidate', handleNewICECandidateMsg);

            socketRef.current.on('user-disconnected', (userId: string) => {
                const peerObj = peersRef.current.find(p => p.peerId === userId);
                if (peerObj) {
                    peerObj.peer.close();
                }
                peersRef.current = peersRef.current.filter(p => p.peerId !== userId);
                setPeers([...peersRef.current]);
            });
        }

        startLocalStream()
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {

        // });
    }, []);

    const createPeer = (userIdToCall: string, callerId: string, stream: any) => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('candidate', event.candidate, userIdToCall);
            }
        };

        peer.ontrack = (event) => {
            const peerObj = {
                peerId: userIdToCall,
                stream: event.streams[0],
            };
            setPeers((peers) => [...peers, peerObj]);
        };

        stream.getTracks().forEach((track: any) => peer.addTrack(track, stream));

        peer.createOffer().then(offer => {
            peer.setLocalDescription(offer).then(() => {
                socketRef.current.emit('offer', offer, userIdToCall);
            });
        });

        return peer;
    };

    const handleReceiveCall = (offer: any, callerId: string) => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('candidate', event.candidate, callerId);
            }
        };

        peer.ontrack = (event) => {
            const peerObj = {
                peerId: callerId,
                stream: event.streams[0],
            };
            setPeers((peers) => [...peers, peerObj]);
        };

        peer.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
            myStream?.getTracks().forEach((track: any) => peer.addTrack(track, myStream));

            peer.createAnswer().then(answer => {
                peer.setLocalDescription(answer).then(() => {
                    socketRef.current.emit('answer', answer, callerId);
                });
            });
        });

        peersRef.current.push({
            peerId: callerId,
            peer,
        });
    };

    const handleAnswer = (answer: any, callerId: string) => {
        const peer = peersRef.current.find(p => p.peerId === callerId)?.peer;
        peer?.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleNewICECandidateMsg = (candidate: any, userId: string) => {
        const peer = peersRef.current.find(p => p.peerId === userId)?.peer;
        peer?.addIceCandidate(new RTCIceCandidate(candidate));
    };

    return (
        <div>
            <video ref={localVideoRef} muted autoPlay style={{ width: '200px', height: '150px', backgroundColor: "lightblue" }} />
            <div>
                {peers.map((peerObj, index) => (
                    <Video key={index} peer={peerObj.peerId} stream={peerObj.stream} />
                ))}
            </div>
        </div>
    );
};

const Video = ({ peer, stream }: {
    peer: any,
    stream: any,
}) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        ref.current.srcObject = stream;
    }, [stream]);

    return <video ref={ref} autoPlay style={{ width: '200px', height: '150px', backgroundColor: "lightcyan" }} />;
};

export default Calls;
