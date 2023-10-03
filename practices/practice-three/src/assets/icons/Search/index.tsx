import { SVGProps, memo } from 'react';

export const Search = memo(
  ({ fill = '#6A6A6A', ...props }: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={30}
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        d="M25.507 7.2H1.8a1.8 1.8 0 0 1 0-3.6h23.707a5.402 5.402 0 0 1 10.186 0H40.2a1.8 1.8 0 0 1 0 3.6h-4.507a5.402 5.402 0 0 1-10.186 0ZM40.2 26.4a1.8 1.8 0 0 0 0-3.6H16.493a5.402 5.402 0 0 0-10.186 0H1.8a1.8 1.8 0 0 0 0 3.6h4.507a5.402 5.402 0 0 0 10.186 0H40.2Z"
      />
    </svg>
  ),
);
