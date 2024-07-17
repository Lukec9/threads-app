import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const setConversations = useSetRecoilState(conversationsAtom);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setMessages(messages => [...messages, data]);

      if (selectedConversation.mock) {
        const updatedConv = {
          ...selectedConversation,
          _id: data.conversationId,
          mock: false,
        };

        setSelectedConversation(updatedConv);
      }

      setConversations(prevConvs => {
        const updatedConversations = prevConvs.map(conversation => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              _id: data.conversationId,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
              mock: false,
            };
          }
          return conversation;
        });
        return updatedConversations;
      });

      setMessageText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          onChange={e => setMessageText(e.target.value)}
          value={messageText}
        />{" "}
        <InputRightElement onClick={handleSubmit} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
