import React, { useEffect, useMemo, useState } from 'react'

const peerContext = React.createContext()

export const PeerProvider = ({ children }) => {
  // const peer = useMemo(() => { new RTCPeerConnection({
  //   iceServers: [
  //     {
  //       urls: "stun:stun.l.google.com:19302",
  //     },
  //   ]
  // }) }, [])
  const [peer,setPeer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null)

  React.useEffect(() => {

    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },

      ]
    })
    setPeer(peer);
  }
  ,[])

  const createOffer = async () => {
    if(!peer) return;
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    return offer
  }

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    return answer
  }

  const handleOffer = async (offer) => {
    if(!peer) return;
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    return answer
  }

  const handleAnswer = async (answer) => {
    if(!peer) return;
    await peer.setRemoteDescription(answer)
  }

  const sendStream = async (stream) => {
    if(!peer) return;
    stream.getTracks().forEach(track => peer.addTrack(track, stream))
  }

  useEffect(() => {
    if(!peer) return;
    const handleTrackListener = (event) => {
      setRemoteStream(event.streams[0])
    }
    peer.addEventListener("track", handleTrackListener)
    return () => {
      peer.removeEventListener("track", handleTrackListener)
    }
  }, [peer])

    return (
        <peerContext.Provider value={{
            peer,
            createOffer,
            createAnswer,
            handleOffer,
            handleAnswer,
            sendStream,
            remoteStream
        }}>
            {children}
        </peerContext.Provider>
    )
}

export const usePeer = () => {
    return React.useContext(peerContext)
}
