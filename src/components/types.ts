interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
  updated_at: string; 
}

interface Message {
  id: string;
  chat_id: string;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User,
  user_attributes: {
    chat_avatar: string | null;
    chat_title: string | null;
    chat_description: string | null;
    user_name: string | null;
    user_avatar: string | null;
  }
}

interface Chat {
  id: string;
  chatable_type: string | null;
  chatable_id: number | null;
  open: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  messages: Message[] | [];
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
