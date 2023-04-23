import Link from "next/link";
import Avatar from "./avatar";

interface ChatroomProps {
  name: string;
  message: string;
  id: number;
}

export default function Chatroom({ name, message, id }: ChatroomProps) {
  return (
    <Link href={`/chats/${id}`}>
      <div className="my-2 flex cursor-pointer items-center space-x-3 px-4 py-3">
        <Avatar url="" />
        <div>
          <p className=" text-gray-700">{name}</p>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
    </Link>
  );
}
