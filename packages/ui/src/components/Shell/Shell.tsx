import {
  forwardRef,
  Fragment,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  rail,
  brand,
  railItem,
  railSpacer,
  topbar,
  crumbs,
  crumbSep,
  crumbCurrent,
  crumbStep,
  idPill,
  topbarSpacer,
  topbarRight,
  main,
} from './Shell.css';
import { cn } from '../../utils/cn';

// ─── Rail ─────────────────────────────────────────────────────────
export interface RailProps extends HTMLAttributes<HTMLElement> {
  /** Brand glyph rendered at the top (typically single letter) */
  brandGlyph?: ReactNode;
  children?: ReactNode;
}

export const Rail = forwardRef<HTMLElement, RailProps>(
  ({ brandGlyph, className, children, ...rest }, ref) => (
    <aside ref={ref} className={cn(rail, className)} {...rest}>
      {brandGlyph !== undefined && <div className={brand}>{brandGlyph}</div>}
      {children}
    </aside>
  ),
);
Rail.displayName = 'Rail';

export interface RailItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label?: string;
  children?: ReactNode;
}

export const RailItem = forwardRef<HTMLButtonElement, RailItemProps>(
  ({ active, label, className, children, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(railItem, className)}
      data-active={active ? 'true' : undefined}
      title={label}
      aria-label={label}
      {...rest}
    >
      {children}
    </button>
  ),
);
RailItem.displayName = 'RailItem';

export const RailSpacer = () => <div className={railSpacer} />;

// ─── Topbar ───────────────────────────────────────────────────────
export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const Topbar = forwardRef<HTMLElement, TopbarProps>(
  ({ className, children, ...rest }, ref) => (
    <header ref={ref} className={cn(topbar, className)} {...rest}>
      {children}
    </header>
  ),
);
Topbar.displayName = 'Topbar';

export const TopbarSpacer = () => <div className={topbarSpacer} />;

export const TopbarRight = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(topbarRight, className)} {...rest}>
    {children}
  </div>
);

// ─── Breadcrumbs ──────────────────────────────────────────────────
export interface CrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Ordered array of breadcrumb labels — last one is rendered as current */
  items: string[];
  /** Optional pill label (e.g. screen id) appended after crumbs */
  pill?: string;
}

export const Crumbs = ({ items, pill, className, ...rest }: CrumbsProps) => (
  <nav className={cn(crumbs, className)} aria-label="Breadcrumb" {...rest}>
    {items.map((label, i) => {
      const isLast = i === items.length - 1;
      return (
        <Fragment key={`${label}-${i}`}>
          <span className={isLast ? crumbCurrent : crumbStep}>{label}</span>
          {!isLast && <span className={crumbSep}>/</span>}
        </Fragment>
      );
    })}
    {pill && <span className={idPill}>{pill}</span>}
  </nav>
);

// ─── Main content wrapper ─────────────────────────────────────────
export const Main = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, children, ...rest }, ref) => (
    <main ref={ref} className={cn(main, className)} {...rest}>
      {children}
    </main>
  ),
);
Main.displayName = 'Main';
