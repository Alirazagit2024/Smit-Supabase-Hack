import React, { useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext.jsx';
import supabase from '../../lib/supabase';
import { BsChatDots, BsSendFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

const UserChat = () => {
  const { user, role, userName, loading } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change or modal opens
  useEffect(() => {
    scrollToBottom();
  }, [messages, isModalOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, content, created_at, user_id, user_name')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const channel = supabase.channel('messages-channel-user', {
      identifier: `user-${Date.now()}`
    });

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    if (!user) {
      toast.error('You must be logged in to send messages');
      return;
    }

    const messageData = {
      content: newMessage,
      user_id: user.id,
      user_name: userName || user.email.split('@')[0]
    };

    const { error } = await supabase
      .from('messages')
      .insert(messageData);

    if (error) {
      console.error('Error sending message:', error);
      toast.error(`Failed to send message: ${error.message}`);
    } else {
      setNewMessage('');
    }
  };

  if (loading) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 z-50 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Open chat"
      >
        <BsChatDots className="h-6 w-6" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </button>

      {/* Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-2 sm:p-4 md:p-6">
          {/* Overlay */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50/50"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Chat Container */}
          <div className="relative w-full max-w-md h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-green-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <BsChatDots className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Support Chat</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-green-700 transition"
                aria-label="Close chat"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {/* User Status */}
            {user && (
              <div className="px-4 py-2 bg-green-50 text-sm text-green-800 flex items-center">
                <FiUser className="mr-2" />
                {userName || user.email} ({role || 'user'})
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-repeat">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex mb-4 ${msg.user_id === user?.id ? 'justify-end' : 'justify-start animate-slide-in'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                        msg.user_id === user?.id 
                          ? 'bg-green-500 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="font-medium text-xs">
                        {msg.user_name || 'Unknown'}
                      </div>
                      <p className="mt-1 text-sm">{msg.content}</p>
                      <div className={`text-xs mt-1 ${msg.user_id === user?.id ? 'text-green-100' : 'text-gray-500'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white">
              {!user ? (
                <div className="text-center py-4 text-gray-500">
                  Please log in to send messages
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-2 px-4 cursor-pointer bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                  >
                    {/* <BsSendFill className="h-5 w-7" /> */}
                    <IoMdSend className="text-lg" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserChat;