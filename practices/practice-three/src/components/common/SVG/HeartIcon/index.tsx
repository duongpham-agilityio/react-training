import { Button } from '@chakra-ui/react';
import { MouseEvent, memo, useMemo } from 'react';

export interface HeartIconProps {
  onClick: (e: MouseEvent) => void;
  variant?: 'outline' | 'fill';
  color?: string;
}

const Heart = ({
  color = '#979797',
  variant = 'outline',
  onClick,
}: HeartIconProps) => {
  const icon = useMemo(() => {
    if (variant === 'outline')
      return (
        <svg
          width="32"
          height="27"
          viewBox="0 0 32 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8.90031C0 3.8718 4.33215 0 9.41714 0C12.0383 0 14.3449 1.25157 16 2.871C17.6551 1.25157 19.9617 0 22.5829 0C27.6679 0 32 3.8718 32 8.90031C32 12.3449 30.5575 15.3741 28.559 17.9346C26.5639 20.4907 23.9542 22.6601 21.4555 24.4228C20.5011 25.0961 19.5356 25.7172 18.6519 26.1755C17.8222 26.6058 16.8681 27 16 27C15.1319 27 14.1778 26.6058 13.3481 26.1755C12.4644 25.7172 11.4989 25.0961 10.5445 24.4228C8.04581 22.6601 5.43611 20.4907 3.44104 17.9346C1.44252 15.3741 0 12.3449 0 8.90031ZM9.41714 2.7931C5.61509 2.7931 2.74286 5.64039 2.74286 8.90031C2.74286 11.5137 3.8323 13.9469 5.58828 16.1967C7.34772 18.4509 9.71506 20.4398 12.1065 22.1269C13.0114 22.7653 13.8638 23.3085 14.5928 23.6866C15.3758 24.0926 15.8293 24.2069 16 24.2069C16.1707 24.2069 16.6242 24.0926 17.4072 23.6866C18.1362 23.3085 18.9886 22.7653 19.8935 22.1269C22.2849 20.4398 24.6523 18.4509 26.4117 16.1967C28.1677 13.9469 29.2571 11.5137 29.2571 8.90031C29.2571 5.64039 26.3849 2.7931 22.5829 2.7931C20.3993 2.7931 18.3603 4.12154 17.0872 5.80765C16.8276 6.15146 16.4259 6.35294 16 6.35294C15.5741 6.35294 15.1724 6.15146 14.9128 5.80765C13.6397 4.12154 11.6007 2.7931 9.41714 2.7931Z"
            fill={color}
          />
        </svg>
      );

    return (
      <svg
        width="54"
        height="49"
        viewBox="0 0 54 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_17_126)">
          <path
            d="M18.4171 9C13.3321 9 9 12.8718 9 17.9003C9 21.3693 10.5951 24.2898 12.7092 26.7091C14.8161 29.12 17.5342 31.1437 19.9915 32.8375L24.2312 35.76C24.6956 36.08 25.3044 36.08 25.7688 35.76L30.0085 32.8375C32.4658 31.1437 35.1839 29.12 37.2908 26.7091C39.4049 24.2898 41 21.3693 41 17.9003C41 12.8718 36.6679 9 31.5829 9C28.9617 9 26.6551 10.2516 25 11.871C23.3449 10.2516 21.0383 9 18.4171 9Z"
            fill="#E86F6F"
            shapeRendering="crispEdges"
          />
          <path
            d="M18.4171 9C13.3321 9 9 12.8718 9 17.9003C9 21.3693 10.5951 24.2898 12.7092 26.7091C14.8161 29.12 17.5342 31.1437 19.9915 32.8375L24.2312 35.76C24.6956 36.08 25.3044 36.08 25.7688 35.76L30.0085 32.8375C32.4658 31.1437 35.1839 29.12 37.2908 26.7091C39.4049 24.2898 41 21.3693 41 17.9003C41 12.8718 36.6679 9 31.5829 9C28.9617 9 26.6551 10.2516 25 11.871C23.3449 10.2516 21.0383 9 18.4171 9Z"
            stroke="#FF8181"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_17_126"
            x="0.5"
            y="0.5"
            width="53"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.542262 0 0 0 0 0.542262 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_17_126"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_17_126"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }, [color, variant]);

  return (
    <Button
      size="unset"
      bg="transparent"
      onClick={onClick}
      _hover={{
        bg: 'transparent',
      }}
    >
      {icon}
    </Button>
  );
};

export const HeartIcon = memo(Heart);
