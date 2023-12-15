export type User = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
}

export type Chat = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: LastMessage,
}

export type LastMessage = {
  user: {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string
  },
  time: string,
  content: string
}

export type MessageType = {
  chat_id: number,
  time: string,
  type: string,
  user_id: string,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }           
}

export type StoreType = {
  user?: User | null,
  chats?: Chat[],
  current_chat?: number | null,
  messages?: Record<number, MessageType[]>
}
