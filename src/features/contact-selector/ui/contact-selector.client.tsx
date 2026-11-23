'use client';

import { useId, useState, type CSSProperties } from 'react';
import { cn } from '@/shared/lib/utils';
import { getContactHref, mockData, type Contact } from '../model/contacts';

const center = 134;
const innerRadius = 57;
const outerRadius = 116;
const iconRadius = (innerRadius + outerRadius) / 2;
const iconSize = 24;
const dividerStart = center + innerRadius + 5;
const dividerEnd = dividerStart + 56;
const sectorAngle = (2 * Math.PI) / mockData.length;

function point(radius: number, angle: number) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

const segments = mockData.map((contact, index) => {
  const start = -Math.PI / 2 + index * sectorAngle;
  const end = start + sectorAngle;
  const angle = start + sectorAngle / 2;
  const outerStart = point(outerRadius, start);
  const outerEnd = point(outerRadius, end);
  const innerStart = point(innerRadius, start);
  const innerEnd = point(innerRadius, end);
  const largeArc = sectorAngle > Math.PI ? 1 : 0;

  return {
    contact,
    dividerRotation: (start * 180) / Math.PI,
    path: [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' '),
    icon: point(iconRadius, angle),
    offset: {
      '--segment-x': `${5 * Math.cos(angle)}px`,
      '--segment-y': `${5 * Math.sin(angle)}px`,
    } as CSSProperties,
  };
});

export function ContactSelector({
  label,
  actionLabel,
}: {
  label: string;
  actionLabel: string;
}) {
  const dividerGradient = useId();
  const [hoveredContact, setHoveredContact] = useState<Contact | null>(null);
  const [focusedContact, setFocusedContact] = useState<Contact | null>(null);
  const activeContact = hoveredContact ?? focusedContact;

  return (
    <svg
      className="mx-auto block w-full max-w-67 select-none"
      viewBox="0 0 268 268"
      role="group"
      aria-label={label}
      onPointerMove={(event) => {
        if (event.target === event.currentTarget) setHoveredContact(null);
      }}
      onPointerLeave={() => setHoveredContact(null)}
    >
      <defs>
        <linearGradient
          id={dividerGradient}
          gradientUnits="userSpaceOnUse"
          x1={dividerStart}
          y1={center}
          x2={dividerEnd}
          y2={center}
        >
          <stop className="[stop-color:var(--line)]" stopOpacity={0} />
          <stop offset="22%" className="[stop-color:var(--line)]" />
          <stop offset="65%" className="[stop-color:var(--line)]" />
          <stop
            offset="100%"
            className="[stop-color:var(--line)]"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>

      {segments.map(({ contact, path, icon, offset }) => (
        <a
          key={contact.id}
          className="group/segment cursor-pointer focus-visible:outline-none"
          href={getContactHref(contact)}
          aria-label={contact.label}
          data-active={contact === activeContact}
          onPointerMove={(event) => {
            if (event.pointerType !== 'touch') setHoveredContact(contact);
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(':focus-visible')) {
              setHoveredContact(null);
              setFocusedContact(contact);
            }
          }}
          onBlur={() => setFocusedContact(null)}
          target="_blank"
        >
          <path className="fill-transparent" d={path} />
          <g
            className={cn(
              'pointer-events-none origin-center transform-view',
              'transition-[transform,translate,scale] duration-240 ease-out motion-reduce:transition-none',
              'group-data-[active=true]/segment:translate-x-(--segment-x)',
              'group-data-[active=true]/segment:translate-y-(--segment-y)',
              'group-data-[active=true]/segment:scale-107',
            )}
            style={offset}
            aria-hidden="true"
          >
            <path
              className={cn(
                'fill-transparent transition-[fill] duration-240 ease-out motion-reduce:transition-none',
                'group-data-[active=true]/segment:fill-contact-active',
                'group-data-[active=true]/segment:[pointer-events:fill]',
                'group-focus-visible/segment:stroke-focus-ring group-focus-visible/segment:stroke-2',
              )}
              d={path}
            />
            <contact.icon
              x={icon.x - iconSize / 2}
              y={icon.y - iconSize / 2}
              size={iconSize}
              className="text-muted group-data-[active=true]/segment:text-text"
            />
          </g>
        </a>
      ))}

      <g className="pointer-events-none" aria-hidden="true">
        {segments.map(({ contact, dividerRotation }) => (
          <line
            key={contact.id}
            x1={dividerStart}
            y1={center}
            x2={dividerEnd}
            y2={center}
            transform={`rotate(${dividerRotation} ${center} ${center})`}
            stroke={`url(#${dividerGradient})`}
            strokeLinecap="round"
          />
        ))}
      </g>

      {activeContact && (
        <a
          className="cursor-pointer"
          href={getContactHref(activeContact)}
          aria-label={`${actionLabel} · ${activeContact.label}`}
          tabIndex={-1}
          onPointerDown={() => setHoveredContact(activeContact)}
          target="_blank"
        >
          <circle
            className="fill-transparent"
            cx={center}
            cy={center}
            r={innerRadius}
          />
          <text
            className="pointer-events-none"
            textAnchor="middle"
            dominantBaseline="central"
            aria-hidden="true"
          >
            <tspan
              x={center}
              y={center - 10}
              className="fill-text text-[13px] font-semibold"
            >
              {activeContact.label}
            </tspan>
            <tspan
              x={center}
              y={center + 13}
              className="fill-muted text-[10px]"
            >
              {actionLabel}
            </tspan>
          </text>
        </a>
      )}
    </svg>
  );
}
