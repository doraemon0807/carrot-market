import { cls } from "@/libs/client/utils";
import Avatar from "./avatar";

interface ChatMessageProps {
  message: string;
  reverted?: boolean;
  avatarUrl?: string;
  senderId: number;
}

export default function ChatMessage({
  message,
  reverted,
  avatarUrl,
  senderId,
}: ChatMessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reverted ? "" : "flex-row-reverse space-x-reverse"
      )}
    >
      <Avatar id={senderId + ""} url={avatarUrl + ""} size="small" />
      <div className="w-1/2 rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm">
        <p>{message}</p>
      </div>
    </div>
  );
}
