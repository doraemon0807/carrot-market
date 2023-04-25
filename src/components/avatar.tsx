import cls from "@/libs/client/utils";

interface AvatarProps {
  size?: "small" | "large";
  url: string;
  [key: string]: any;
}

export default function Avatar({ size, onClick, ...rest }: AvatarProps) {
  return (
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
  );
}
