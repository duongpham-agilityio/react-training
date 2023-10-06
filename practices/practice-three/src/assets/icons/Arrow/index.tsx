import { SVGProps, memo } from 'react';

export const ArrowRight = memo(
  ({ fill = '#737373', ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill={fill}
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  ),
);

export const ArrowLeft = memo(
  ({ fill = '#737373', ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill={fill}
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  ),
);

export const ArrowLeftOutline = memo(
  (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={59}
      height={12}
      fill="none"
      {...props}
    >
      <path stroke="#000" strokeWidth={2} d="M59 6H5" />
      <path fill="#000" d="M6 0v12L0 6l6-6Z" />
    </svg>
  ),
);

export const ArrowRightOutline = memo(
  (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={59}
      height={12}
      fill="none"
      {...props}
    >
      <path stroke="#000" strokeWidth={2} d="M0 6h54" />
      <path fill="#000" d="M53 12V0l6 6-6 6Z" />
    </svg>
  ),
);
