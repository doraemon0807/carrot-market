import { cls } from "@/libs/client/utils";
import Link from "next/link";

interface FloatButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function FloatButton({ children, href }: FloatButtonProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-32 right-8 cursor-pointer rounded-full border-transparent bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500"
    >
      {children}
    </Link>
  );
}
