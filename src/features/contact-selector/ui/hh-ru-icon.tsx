import { IconBase, type IconBaseProps } from 'react-icons';

export function HhRuIcon(props: IconBaseProps) {
  return (
    <IconBase
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6.5 15.5v-7m0 4a2 2 0 0 1 4 0v3M13.5 15.5v-7m0 4a2 2 0 0 1 4 0v3" />
    </IconBase>
  );
}
