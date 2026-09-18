import { cn } from "../../utils/helpers";

export const Spinner = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={cn(
          "border-primary-600 border-t-transparent rounded-full animate-spin",
          sizes[size],
          className
        )} 
      />
    </div>
  );
};
