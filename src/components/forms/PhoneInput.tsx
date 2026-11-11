'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import {
  COUNTRIES,
  DEFAULT_COUNTRY_ISO,
  type Country,
} from '@/config/countries';
import { cn } from '@/lib/utils';

const MAX_LOCAL_DIGITS = 14;

function getCountry(iso: string): Country {
  return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
}

function Flag({ iso, className }: { iso: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${iso}.svg`}
      alt=""
      aria-hidden="true"
      width={20}
      height={15}
      loading="lazy"
      className={cn('h-[15px] w-5 shrink-0 object-contain', className)}
    />
  );
}

interface PhoneInputProps {
  id?: string;
  /** Full phone value, e.g. "+977 9812345678". Empty string when blank. */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  defaultCountry?: string;
  /** Extra classes for the outer field wrapper (border / background). */
  className?: string;
}

export default function PhoneInput({
  id,
  value,
  onChange,
  onBlur,
  name,
  placeholder = '98XXXXXXXX',
  invalid,
  required,
  defaultCountry = DEFAULT_COUNTRY_ISO,
  className,
}: PhoneInputProps) {
  const autoId = useId();
  const inputId = id ?? `phone-${autoId}`;
  const listboxId = `${inputId}-countries`;

  const [iso, setIso] = useState(defaultCountry);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const country = getCountry(iso);

  // Local number = full value minus the selected dial-code prefix
  const localNumber = value.startsWith(`${country.dial} `)
    ? value.slice(country.dial.length + 1)
    : value.replace(/^\+\d+\s*/, '');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.replace('+', '').startsWith(q) ||
        c.iso === q
    );
  }, [query]);

  const emit = (dial: string, local: string) => {
    onChange(local ? `${dial} ${local}` : '');
  };

  const openMenu = () => {
    setQuery('');
    setHighlight(Math.max(0, COUNTRIES.findIndex((c) => c.iso === iso)));
    setOpen(true);
  };

  const closeMenu = (focusTrigger = false) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const selectCountry = (next: Country) => {
    setIso(next.iso);
    emit(next.dial, localNumber);
    setOpen(false);
    phoneRef.current?.focus();
  };

  // Focus search box when the menu opens
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keep highlighted option in view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlight, open]);

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[highlight];
      if (target) selectCountry(target);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(true);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={cn(
          'flex items-center rounded-lg border bg-white transition-colors focus-within:border-forest',
          invalid ? 'border-danger' : 'border-line-strong',
          className
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault();
              openMenu();
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="ml-1 flex shrink-0 items-center gap-1.5 rounded-md bg-paper-deep px-2.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
        >
          <Flag iso={country.iso} />
          <span className="tabular-nums">{country.dial}</span>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 text-muted transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </button>

        <span className="mx-2 h-6 w-px shrink-0 bg-line" aria-hidden="true" />

        <input
          ref={phoneRef}
          id={inputId}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          aria-required={required ? 'true' : undefined}
          aria-invalid={invalid ? 'true' : undefined}
          value={localNumber}
          onChange={(e) =>
            emit(
              country.dial,
              e.target.value.replace(/\D/g, '').slice(0, MAX_LOCAL_DIGITS)
            )
          }
          onBlur={onBlur}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2.5 pr-3.5 text-sm text-ink placeholder:text-faint focus:outline-none"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 min-w-[16rem] overflow-hidden rounded-xl border border-line bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="border-b border-line p-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlight(0);
                }}
                onKeyDown={onSearchKeyDown}
                placeholder="Search country or code"
                aria-label="Search country or code"
                aria-controls={listboxId}
                aria-activedescendant={
                  filtered[highlight]
                    ? `${listboxId}-${filtered[highlight].iso}`
                    : undefined
                }
                className="w-full rounded-lg border border-line-strong bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-forest focus:outline-none"
              />
            </div>
          </div>

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Country codes"
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-xs text-muted">
                No matching country
              </li>
            ) : (
              filtered.map((c, idx) => {
                const isSelected = c.iso === iso;
                const isActive = idx === highlight;
                return (
                  <li
                    key={c.iso}
                    id={`${listboxId}-${c.iso}`}
                    role="option"
                    aria-selected={isSelected}
                    data-index={idx}
                    onMouseEnter={() => setHighlight(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectCountry(c)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-sm transition-colors',
                      isActive && 'bg-paper-deep'
                    )}
                  >
                    <Flag iso={c.iso} />
                    <span
                      className={cn(
                        'truncate',
                        isSelected
                          ? 'font-semibold text-forest'
                          : 'font-medium text-ink'
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="ml-auto pl-3 text-xs font-medium tabular-nums text-muted">
                      {c.dial}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

