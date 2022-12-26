import React, { useContext, useEffect, useRef, useState } from 'react'
import { userChats } from '../../api/ChatRequest'
import ChatBox from './ChatBox'
import Conversation from './Conversation'
import { io } from 'socket.io-client'
import { CompanyContext } from '../../Store/CompanyContext'
import ConversationCompany from './ConversationCompany'
import ChatBoxCompany from './ChatBoxCompany'

function ChatCompany() {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const socket = useRef()
    const { companyDetails, setCompanyDetails } = useContext(CompanyContext)
    // console.log(companyDetails,'444444444444444');

    /* ---------------------- send message to socket server --------------------- */

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET,{path: '/socket/socket.io'})
        socket.current.emit("new-user-add", companyDetails?._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
            // console.log(onlineUsers);
        })
    }, [companyDetails])

    /* ------------------- receive message from socket server ------------------- */

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data)
        })
    }, [])

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(companyDetails._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    }, [companyDetails])

    const checkOnlineStatus =(Chat)=>{
        const chatMember = Chat.members.find((member)=>member!==companyDetails._id)
        const online = onlineUsers.find((user)=> user.userId === chatMember)
        return online ? true:false
    }

    return (
        <div className=' flex justify-center md:justify-end'>
            <div className="container w-4/5 pt-20 ">

                {/* left side*/}

                <div className="min-w-full border rounded md:grid md:grid-cols-3">
                    <div className="border-r border-gray-300 md:col-span-1">
                        <div className="mx-3 my-3">
                            <div className="relative text-gray-600">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                                <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                    placeholder="Search" required />
                            </div>
                        </div>

                        <ul className="overflow-auto h-[32rem]">
                            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                            <li>
                                {chats.map((chat) => (
                                    <div onClick={() => setCurrentChat(chat)}>
                                        <ConversationCompany data={chat} currentUserId={companyDetails._id} online ={checkOnlineStatus(chat)} />
                                    </div>
                                ))}
                                
                            </li>
                        </ul>
                    </div>

                    {/* right */}

                    <div className="hidden md:col-span-2 md:block">
                        <ChatBoxCompany chat={currentChat} currentUser={companyDetails._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatCompany