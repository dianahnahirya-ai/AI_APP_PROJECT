import { cn } from "../../utils/helpers";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export const Alert = ({ type = 'info', title, message, className }) => {
  const types = {
    success: {
      icon: CheckCircleIcon,
      containerClass: 'bg-green-50',
      iconClass: 'text-green-400',
      titleClass: 'text-green-800',
      messageClass: 'text-green-700',
    },
    error: {
      icon: XCircleIcon,
      containerClass: 'bg-red-50',
      iconClass: 'text-red-400',
      titleClass: 'text-red-800',
      messageClass: 'text-red-700',
    },
    warning: {
      icon: ExclamationTriangleIcon,
      containerClass: 'bg-amber-50',
      iconClass: 'text-amber-400',
      titleClass: 'text-amber-800',
      messageClass: 'text-amber-700',
    },
    info: {
      icon: InformationCircleIcon,
      containerClass: 'bg-blue-50',
      iconClass: 'text-blue-400',
      titleClass: 'text-blue-800',
      messageClass: 'text-blue-700',
    },
  };

  const style = types[type];
  const Icon = style.icon;

  return (
    <div className={cn("rounded-md p-4", style.containerClass, className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn("h-5 w-5", style.iconClass)} aria-hidden="true" />
        </div>
        <div className="ml-3">
          {title && <h3 className={cn("text-sm font-medium", style.titleClass)}>{title}</h3>}
          {message && (
            <div className={cn("text-sm", title && "mt-2", style.messageClass)}>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
