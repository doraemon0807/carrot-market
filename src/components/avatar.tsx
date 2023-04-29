import cls from "@/libs/client/utils";
import Link from "next/link";

interface AvatarProps {
  size?: "small" | "large";
  url: string | null;
  id: string;
  [key: string]: any;
}

export default function Avatar({
  size,
  onClick,
  url,
  id,
  ...rest
}: AvatarProps) {
  return (
    <Link href={`/users/profile/${id}`}>
      <div
        {...rest}
        className={cls(
          "rounded-full bg-slate-500",
          size === "large"
            ? "h-16 w-16"
            : size === "small"
            ? "h-8 w-8"
            : "h-12 w-12"
        )}
      />
    </Link>
  );
}
