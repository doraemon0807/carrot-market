import { useCFUrl } from "@/libs/client/utils";
import { cls } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface AvatarProps {
  size?: "small" | "large";
  imgId: string | null;
  id: string;
  previewUrl?: string;
  [key: string]: any;
}

export default function Avatar({
  size,
  imgId,
  previewUrl,
  id, //id of the user
  ...rest
}: AvatarProps) {
  const src = useCFUrl({ variant: "avatar", imgId: imgId });
  return (
    <Link href={`/users/profile/${id}`}>
      {previewUrl ? (
        <Image
          alt=""
          width={48}
          height={48}
          src={previewUrl}
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
      ) : !previewUrl && imgId ? (
        <Image
          alt=""
          width={48}
          height={48}
          src={src}
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
      ) : (
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
      )}
    </Link>
  );
}
