interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode | string;
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={[
        "px-4 py-2",
        variant === "primary" && "bg-black text-white",
        variant === "secondary" && "bg-white border",
        props.disabled && "cursor-not-allowed opacity-40",
      ].join(" ")}
      {...props}
    />
  );
}
