import { CSSProperties, useMemo } from "react";

import css from "./horizontal-line.module.css";

type Props_HorizontalLine = {
  shorten?: number;
  spacing?: number;
  style?: CSSProperties;
};

export const HorizontalLine = ({ shorten = 0, spacing = 0, style }: Props_HorizontalLine) => {
  const innerStyle = useMemo(
    () => ({
      "--margin": `${spacing}px ${shorten}px`,
      ...style,
    }),
    [shorten, spacing, style]
  );

  return <div style={innerStyle} className={css.horizontalLine}></div>;
};
