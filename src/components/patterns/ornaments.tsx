import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;
export function Lotus(props: Props) {
  return (
    <svg
      viewBox="0 0 80 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      {...props}
    >
      <path d="M40 45C22 34 25 14 40 3c15 11 18 31 0 42Z" />
      <path d="M40 45C20 46 9 31 11 16c18 0 29 12 29 29Zm0 0c20 1 31-14 29-29-18 0-29 12-29 29Z" />
      <path d="M40 45C21 52 6 43 2 31c18-6 30 1 38 14Zm0 0c19 7 34-2 38-14-18-6-30 1-38 14ZM14 50h52" />
    </svg>
  );
}
export function Rangoli(props: Props) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth=".7"
      aria-hidden="true"
      {...props}
    >
      <circle cx="120" cy="120" r="112" />
      <circle cx="120" cy="120" r="94" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 30} 120 120)`}>
          <path d="M120 120C85 85 92 29 120 10c28 19 35 75 0 110Z" />
          <path d="M120 120C104 80 111 49 120 35c9 14 16 45 0 85Z" />
          <circle cx="120" cy="19" r="3" />
        </g>
      ))}
      <circle cx="120" cy="120" r="16" />
      <circle cx="120" cy="120" r="8" />
    </svg>
  );
}
export function PalaceLine(props: Props) {
  return (
    <svg
      viewBox="0 0 1000 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      {...props}
    >
      <path d="M0 115h1000M0 105h1000M0 95h100V55h20V35h20V20h20v15h20v20h20v40h100V60h35V40h30V25h20V12h30v13h20v15h30v20h35v35h70V55h30V35h20V20h20V5h20v15h20v15h20v20h30v40h70V60h35V40h30V25h20V12h30v13h20v15h30v20h35v35h100V55h20V35h20V20h20v15h20v20h20v40h100" />
      {[140, 330, 490, 650, 840].map((x) => (
        <path key={x} d={`M${x} 105V78q10-23 20 0v27m-25-45h30`} />
      ))}
    </svg>
  );
}
export function Divider() {
  return (
    <div className="ornamental-divider">
      <span />
      <Lotus />
      <span />
    </div>
  );
}
