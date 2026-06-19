export interface IUserEntity {
    id: string;
    user_name: string;
    email: string;
    password_hash?: string;
    created_at: string;
    room?: string;
    chat_id?: string;
}