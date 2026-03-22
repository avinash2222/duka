import { Box } from '@mui/material';

const LOGO_SRC = '/duka-logo.svg';

/**
 * DUKA mark — same asset as mobile-app `assets/duka_logo.svg` (copied to `public/duka-logo.svg`).
 */
export default function DukaLogo({
  width = 48,
  height,
  sx = {},
  ...props
}) {
  const h = height ?? width;
  return (
    <Box
      component="img"
      src={LOGO_SRC}
      alt="DUKA"
      sx={{
        width,
        height: h,
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0,
        ...sx,
      }}
      {...props}
    />
  );
}

