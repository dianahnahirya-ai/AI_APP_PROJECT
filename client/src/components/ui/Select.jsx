import { forwardRef } from 'react';
import { cn } from "../../utils/helpers";

export const Select = forwardRef(({ 
  label, 
  error, 
  options = [], 
  className,
  id,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={cn(
          "block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 outline-none",
          error && "ring-red-300 focus:ring-red-500",
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
