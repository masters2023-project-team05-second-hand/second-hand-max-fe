// TODO: 웹소켓 서버 URL 환경변수로 설정 필요한지?
export const STOMP_URL = "ws://localhost:8080/ws";

export const CHAT_API_PATH = {
  destination: "/sub/chat/room",
  send: "/pub/chat/message",
  chatroom: "/api/chat/room",
  roomList: "/api/chat-room",
  chatList: "/api/chat/message",
};
