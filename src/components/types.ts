export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
  updated_at: string; 
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User,
  is_me: boolean,
  user_attributes: {
    chat_avatar: string | null;
    chat_title: string | null;
    chat_description: string | null;
    user_name: string | null;
    user_avatar: string | null;
  }
}

export interface Chat {
  id: string;
  chatable_type: string | null;
  chatable_id: number | null;
  open: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  messages: Message[];
  pivot: {
    user_id: number;
    chat_id: string;
    user_name: string | null;
    user_avatar: string | null;
    chat_title: string | null;
    chat_description: string | null;
    chat_avatar: string | null;
    last_read_at: string | null;
    has_new_messages: boolean;
    created_at: string;
    updated_at: string;
  };
}
