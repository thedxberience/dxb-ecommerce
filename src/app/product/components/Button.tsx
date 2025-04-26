type ButtonProps = React.PropsWithChildren<{
  textColor?: string;
  className?: string;
  onClick?: () => void;
}>;

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-start font-bold py-2 px-4 rounded-lg ${className}`}
    >
      <div className="flex w-full justify-between">{children}</div>
    </button>
  );
}
