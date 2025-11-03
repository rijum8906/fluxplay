import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// We can move the NavItem type here
export interface NavItem {
  icon: React.ElementType;
  label: string;
  to: string;
  requiresLogin?: boolean;
}

interface SidebarItemProps {
  item: NavItem;
  isOpen: boolean;
  isActive: boolean;
  onClick?: () => void;
  className?: string; // For custom styling (like logout)
}

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -10 },
};

export const SidebarItem = ({
  item,
  isOpen,
  isActive,
  onClick,
  className = '',
}: SidebarItemProps) => {
  const { icon: Icon, label, to } = item;

  const content = (
    <>
      <Icon size={22} />
      {isOpen && (
        <motion.span
          variants={itemVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="text-sm font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </>
  );

  const itemClasses = `
    group relative flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all
    ${
      isActive ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
    }
    ${className}
  `;

  return (
    // 'group' is used for the tooltip
    <Link to={to} onClick={onClick} className={itemClasses}>
      {content}

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div
          className="
            absolute left-full ml-3 px-2 py-1 bg-zinc-800 text-zinc-100 text-xs rounded-md 
            opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
            whitespace-nowrap z-10
          "
        >
          {label}
        </div>
      )}
    </Link>
  );
};
