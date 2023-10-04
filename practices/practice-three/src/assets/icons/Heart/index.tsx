import { SVGProps, memo } from 'react';

export const HeartOutline = memo(
  ({ fill = '#979797', ...props }: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={27}
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M0 8.9C0 3.872 4.332 0 9.417 0 12.038 0 14.345 1.252 16 2.871 17.655 1.251 19.962 0 22.583 0 27.668 0 32 3.872 32 8.9c0 3.445-1.442 6.474-3.441 9.035-1.995 2.556-4.605 4.725-7.104 6.488-.954.673-1.92 1.294-2.803 1.753-.83.43-1.784.824-2.652.824-.868 0-1.822-.394-2.652-.825-.884-.458-1.85-1.079-2.804-1.752-2.498-1.763-5.108-3.932-7.103-6.488C1.443 15.375 0 12.345 0 8.9Zm9.417-6.107c-3.802 0-6.674 2.847-6.674 6.107 0 2.614 1.09 5.047 2.845 7.297 1.76 2.254 4.127 4.243 6.519 5.93.904.638 1.757 1.181 2.486 1.56.783.406 1.236.52 1.407.52.17 0 .624-.114 1.407-.52.73-.379 1.582-.922 2.486-1.56 2.392-1.687 4.76-3.676 6.519-5.93 1.756-2.25 2.845-4.683 2.845-7.297 0-3.26-2.872-6.107-6.674-6.107-2.184 0-4.223 1.329-5.496 3.015-.26.343-.661.545-1.087.545-.426 0-.828-.202-1.087-.545C13.64 4.122 11.6 2.793 9.417 2.793Z"
        clipRule="evenodd"
      />
    </svg>
  ),
);

export const HeartFill = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={54}
    height={49}
    fill="none"
    {...props}
  >
    <g filter="url(#a)" shapeRendering="crispEdges">
      <path
        fill="#E86F6F"
        d="M18.417 9C13.332 9 9 12.872 9 17.9c0 3.47 1.595 6.39 3.71 8.81 2.106 2.41 4.824 4.434 7.281 6.127l4.24 2.923c.465.32 1.073.32 1.538 0l4.24-2.922c2.457-1.694 5.175-3.718 7.282-6.129C39.405 24.29 41 21.37 41 17.9c0-5.028-4.332-8.9-9.417-8.9-2.621 0-4.928 1.252-6.583 2.871C23.345 10.251 21.038 9 18.417 9Z"
      />
      <path
        stroke="#FF8181"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
        d="M18.417 9C13.332 9 9 12.872 9 17.9c0 3.47 1.595 6.39 3.71 8.81 2.106 2.41 4.824 4.434 7.281 6.127l4.24 2.923c.465.32 1.073.32 1.538 0l4.24-2.922c2.457-1.694 5.175-3.718 7.282-6.129C39.405 24.29 41 21.37 41 17.9c0-5.028-4.332-8.9-9.417-8.9-2.621 0-4.928 1.252-6.583 2.871C23.345 10.251 21.038 9 18.417 9Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={53}
        height={48}
        x={0.5}
        y={0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={2} dy={2} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.542262 0 0 0 0 0.542262 0 0 0 0.2 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17_126" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_17_126"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
));

export const HeartSideBarFill = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={53}
    height={45}
    fill="none"
    {...props}
  >
    <path
      fill="#E86F6F"
      stroke="#FF5E5E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="M16.009 1C7.904 1 1 7.166 1 15.175c0 5.524 2.542 10.175 5.912 14.028 3.357 3.84 7.69 7.063 11.606 9.76l6.757 4.655c.74.51 1.71.51 2.45 0l6.757-4.654c3.917-2.698 8.249-5.921 11.606-9.76C49.458 25.35 52 20.698 52 15.173 52 7.167 45.096 1 36.991 1 32.814 1 29.138 2.993 26.5 5.572 23.862 2.993 20.186 1 16.009 1Z"
    />
  </svg>
));
