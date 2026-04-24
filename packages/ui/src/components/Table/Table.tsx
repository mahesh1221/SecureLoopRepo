import {
  forwardRef,
  type HTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
  type TableHTMLAttributes,
  type ReactNode,
} from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import {
  wrap,
  toolbar,
  scroll,
  table,
  th,
  chev,
  td,
  tr,
  chk,
  chkOn,
  footer,
} from './Table.css';
import { cn } from '../../utils/cn';

// ─── Outer Wrap ────────────────────────────────────────────────────
export interface TableWrapProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const TableWrap = forwardRef<HTMLDivElement, TableWrapProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(wrap, className)} {...rest}>
      {children}
    </div>
  )
);
TableWrap.displayName = 'TableWrap';

// ─── Toolbar slot ──────────────────────────────────────────────────
export const TableToolbar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(toolbar, className)} {...rest}>
      {children}
    </div>
  )
);
TableToolbar.displayName = 'TableToolbar';

// ─── Table element ────────────────────────────────────────────────
export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...rest }, ref) => (
    <div className={scroll}>
      <table ref={ref} className={cn(table, className)} {...rest}>
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

// ─── Head + Body passthroughs ─────────────────────────────────────
export const TableHead = ({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead {...rest}>{children}</thead>
);
export const TableBody = ({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...rest}>{children}</tbody>
);

// ─── Header cell ──────────────────────────────────────────────────
type ThVariants = NonNullable<RecipeVariants<typeof th>>;

export interface TableHeaderCellProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    ThVariants {
  /** Show sort chevron */
  showChevron?: boolean;
  children?: ReactNode;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    { align, sortable, active, numeric, showChevron, className, children, ...rest },
    ref
  ) => (
    <th
      ref={ref}
      className={cn(th({ align, sortable, active, numeric }), className)}
      data-sortable={sortable ? 'true' : undefined}
      data-active={active ? 'true' : undefined}
      {...rest}
    >
      {children}
      {(sortable || active) && showChevron !== false && (
        <span className={chev}>▼</span>
      )}
    </th>
  )
);
TableHeaderCell.displayName = 'TableHeaderCell';

// ─── Row ──────────────────────────────────────────────────────────
type TrVariants = NonNullable<RecipeVariants<typeof tr>>;

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TrVariants {
  children?: ReactNode;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, clickable, zebra, className, children, ...rest }, ref) => (
    <tr
      ref={ref}
      className={cn(tr({ selected, clickable, zebra }), className)}
      aria-selected={selected ? 'true' : undefined}
      {...rest}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

// ─── Cell ─────────────────────────────────────────────────────────
type TdVariants = NonNullable<RecipeVariants<typeof td>>;

export interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement>,
    TdVariants {
  children?: ReactNode;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ numeric, mono, className, children, ...rest }, ref) => (
    <td
      ref={ref}
      className={cn(td({ numeric, mono }), className)}
      {...rest}
    >
      {children}
    </td>
  )
);
TableCell.displayName = 'TableCell';

// ─── Checkbox primitive for row selection ─────────────────────────
export interface TableCheckboxProps extends HTMLAttributes<HTMLSpanElement> {
  checked?: boolean;
}

export const TableCheckbox = forwardRef<HTMLSpanElement, TableCheckboxProps>(
  ({ checked, className, ...rest }, ref) => (
    <span
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      className={cn(chk, checked && chkOn, className)}
      {...rest}
    />
  )
);
TableCheckbox.displayName = 'TableCheckbox';

// ─── Footer slot ──────────────────────────────────────────────────
export const TableFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(footer, className)} {...rest}>
      {children}
    </div>
  )
);
TableFooter.displayName = 'TableFooter';
