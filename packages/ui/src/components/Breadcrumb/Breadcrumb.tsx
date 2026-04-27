import { nav, item as itemCls, itemBtn, itemCurrent, separator } from './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  /** Provide onClick to make this item interactive (omit on current item). */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb — sits at top of content area (not topbar).
 * v1 locked pattern: non-current items are <button> with onClick,
 * current (last) item is plain text, no separate Back button.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={nav}>
      {items.map((crumb, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${crumb.label}-${i}`} className={itemCls}>
            {i > 0 && (
              <span className={separator} aria-hidden="true">
                /
              </span>
            )}
            {isLast ? (
              <span className={itemCurrent} aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <button type="button" className={itemBtn} onClick={crumb.onClick}>
                {crumb.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}

Breadcrumb.displayName = 'Breadcrumb';
