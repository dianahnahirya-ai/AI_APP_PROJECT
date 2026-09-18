import { cn } from "../../utils/helpers";

export const Card = ({ title, children, actions, className }) => {
  return (
    <div className={cn("overflow-hidden rounded-lg bg-white shadow", className)}>
      {(title || actions) && (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 flex items-center justify-between">
          {title && <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
