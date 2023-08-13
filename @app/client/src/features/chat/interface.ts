import { ChatMessage } from "../../@types"

export interface IMessageProps {
    messageInfos: ChatMessage
    user: any // gonna change later
    displayDateMessage: boolean
    displayAuthor: boolean
}
