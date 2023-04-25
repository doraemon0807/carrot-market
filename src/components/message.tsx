import cls from "@/libs/client/utils";
import Avatar from "./avatar";

interface MessageProps {
  message: string;
  reverted?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  reverted,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reverted ? "" : "flex-row-reverse space-x-reverse"
      )}
    >
      <Avatar url={avatarUrl + ""} size="small" />
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
}
