export type RegisterForm = {
    email: string;
    password: string;
}

export type ChatMessage = {
    username: string,
    userId: string,
    socketId: string,
    message: string,
    date: Date,
    avatar: string,
}