import { cn } from "../../utils/helpers";

export const Badge = ({ children, variant = 'gray', className }) => {
  const variants = {
    gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    primary: 'bg-primary-50 text-primary-700 ring-primary-700/10',
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    danger: 'bg-red-50 text-red-700 ring-red-600/10',
    warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
