"use client";
import { use, useEffect, useState } from "react"
import Footer from "../../components/FooterSection"
import NavBar from "../../components/NavBar"
import { useSocket } from "../context/socketContext"
import { BACKEND_URL } from "../utils/constants"
import { useAppSelector } from "../store/hooks";
import { usePeer } from "../context/PeerContext";

const LiveStreamPage = () => {
  const socket = useSocket();
  const {peer,createOffer,createAnswer,handleOffer,handleAnswer,sendStream,remoteStream} = usePeer();
  const user = useAppSelector(state => state.user);
  const [video, setVideo] = useState([]);
  useEffect(() => {
    console.log(remoteStream)
    if(remoteStream){
      const guest = document.createElement("video");
      guest.srcObject = remoteStream;
      guest.addEventListener("loadedmetadata", () => {
        guest.play();
      });
      const videoContainer = document.getElementById("guest");
      videoContainer.innerHTML = "";
      videoContainer.appendChild(guest);
    }
  },[remoteStream])
  useEffect(() => {
    if(!socket) return;
    socket.emit("stream:join", { room:"1223jsafhjdshasjkdh", user: user._id })
  }, [socket]);

  useEffect(() => {
    const handleStreamJoined =async (data) => {
      const offer = await createOffer();
      if(offer){
        socket.emit("stream:send", { stream: offer, user: user._id, room: "1223jsafhjdshasjkdh" })
      }
     }
    const handleStreamRecieved = async (data) => {
      const answer = await handleOffer(data.stream);
      if(answer){
        socket.emit("stream:answer", { stream: answer, user: user._id, room: "1223jsafhjdshasjkdh" })
      }
    }

    const handleAnswerRecieved = async (data) => {
      if(data.stream){
        
        await handleAnswer(data.stream);
      }
    }

    socket.on("stream:joined", handleStreamJoined);
    socket.on("stream:received", handleStreamRecieved);
    socket.on("stream:answered", handleAnswerRecieved);
    return () => {
      socket.off("stream:joined",handleStreamJoined);
      socket.off("stream:received",handleStreamRecieved);
    }
  }, [socket]);

  useEffect(() => {
      const host = document.createElement("video");
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          sendStream(stream);
          addVideoStream(host, stream);
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    }, [sendStream]);

    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      // mute
      video.muted = true;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      const videoContainer = document.getElementById("host");
      videoContainer.innerHTML = "";
      videoContainer.appendChild(video);
      // send stream to other users
    }

    return (
        <>
            <NavBar />
        <div className="container mx-auto p-4 min-h-svh">
            <h1 className="text-2xl font-semibold underline underline-offset-auto">Live Stream</h1>
            {/* video container */}
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                        <h2 className="text-xl text-primary-800 font-semibold">Host</h2>
                        <div className="flex justify-center items-center" id="host">
                            
                        </div>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-4">
                        <h2 className="text-xl text-primary-800 font-semibold">Guest</h2>
                        <div className="flex justify-center items-center" id="guest">
                        </div>
                    </div>
                </div>

        </div>
        {/* joinded users container */}
        <div className="grid grid-cols-1 mt-12 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
                <h2 className="text-xl text-primary-800 font-semibold">Joined Users</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 1</div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 2</div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 3</div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 4</div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 5</div>
                    <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">User 6</div>
                </div>
            </div>
            </div>
            {/* controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">Mic</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Video</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Leave</button>

        </div>
        </div>
            <Footer />
        </>
    )

}

export default LiveStreamPage