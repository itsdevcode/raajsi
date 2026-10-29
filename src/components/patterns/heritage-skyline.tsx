/** Decorative, scalable illustration of India's architectural heritage. */
export function HeritageSkyline() {
  return (
    <svg
      className="heritage-skyline"
      viewBox="0 0 1200 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sandstone" x2="1" y2="0">
          <stop stopColor="#af733b" />
          <stop offset=".45" stopColor="#e4b77a" />
          <stop offset="1" stopColor="#c78d50" />
        </linearGradient>
        <linearGradient id="marble" x2="0" y2="1">
          <stop stopColor="#e5e2de" />
          <stop offset="1" stopColor="#d4d1cc" />
        </linearGradient>
        <linearGradient id="fort-red" x2="1" y2="0">
          <stop stopColor="#be3348" />
          <stop offset="1" stopColor="#a82940" />
        </linearGradient>
        <g id="small-arch">
          <path d="M0 25V9Q7-5 14 9v16" fill="#fbf3ec" />
          <path d="M3 25V10q4-8 8 0v15" fill="#9c6351" opacity=".45" />
        </g>
        <g id="chhatri">
          <path d="M0 15Q12-8 24 15Z" fill="currentColor" />
          <path
            d="M-2 16h28v3H-2zM2 20h3v19H2zm17 0h3v19h-3zM0 39h24v4H0z"
            fill="currentColor"
          />
          <path d="M12 0v-8m-3 4h6" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g id="minaret">
          <path d="M7 140 10 17h9l3 123" fill="url(#marble)" />
          <path
            d="M6 137h17v5H6zm2-33h13v4H8zm1-38h11v4H9zm0-40h11v4H9z"
            fill="#c9c2bc"
          />
          <path d="M8 17Q14-1 21 17ZM14 3V-8" fill="#dfd8d1" stroke="#dfd8d1" />
          <path
            d="M13 33v25m0 16v23m0 15v18"
            stroke="#f7f3ee"
            strokeWidth="2"
          />
        </g>
      </defs>
      {/* Qutub Minar */}
      <g transform="translate(8 4)">
        <path
          d="m10 276 13-67 6-57 7-53 4-43 4-29h8l5 29 4 43 7 53 7 57 15 67Z"
          fill="url(#sandstone)"
        />
        <path d="m29 152 7-53h25l7 53zm11-96 4-29h8l5 29z" fill="#9b6034" />
        <path
          d="M16 209h64v8H16zm10-57h46v8H26zm6-53h32v7H32zm6-43h22v7H38zm4-31h13v5H42z"
          fill="#b4814b"
        />
        <path
          d="m30 271 9-54m12 54-1-54m17 54-9-54M38 200l5-38m10 38-1-38m-9-17 3-35m7 35-2-35"
          stroke="#f0cf9e"
          strokeWidth="3"
        />
        <path d="M42 25V11h12v14M38 11q10-12 20 0ZM48 2V-2" fill="#987044" />
      </g>
      {/* Gateway and old city */}
      <g transform="translate(80 165)">
        <path d="M0 115V39h94v76" fill="#cfb18a" />
        <path d="M-5 39Q45-26 99 39Z" fill="#8b6a3e" />
        <path d="M-7 39h108v8H-7z" fill="#b68c53" />
        <path d="M28 115V78q19-36 39 0v37" fill="#f9eddb" />
        <path d="M37 115V79q10-20 21 0v36" fill="#806748" />
        <path d="M8 52h10v49H8zm71 0h9v49h-9z" fill="#e4c796" />
        <path d="M45 5V-8m-4 5h8" stroke="#997447" />
      </g>
      <g transform="translate(179 121)" color="#c9b9b1">
        <use href="#minaret" />
        <use href="#minaret" x="220" />
        <path d="M0 159V113h246v46" fill="#d6c8be" />
        <path d="M0 113h246v6H0z" fill="#b8a69b" />
        {Array.from({ length: 12 }, (_, i) => (
          <use key={i} href="#small-arch" x={8 + i * 19} y="128" />
        ))}
        <path d="M88 159V65h77v94" fill="#cdb6ad" />
        <path d="m81 65 46-33 46 33Z" fill="#e0d0c5" />
        <path d="m90 72 37-25 37 25" stroke="#f2e4d8" strokeWidth="3" />
        <path d="M108 159V109q19-37 39 0v50" fill="#9f847a" />
        <path d="M116 159V111q11-23 23 0v48" fill="#baa092" />
        <use href="#chhatri" x="91" y="25" />
        <use href="#chhatri" x="142" y="25" />
        <path
          d="M45 112V96q20-34 40 0v16m89 0V96q20-34 40 0v16"
          fill="#d6c4bb"
        />
      </g>
      {/* India Gate */}
      <g transform="translate(449 97)">
        <path d="M0 183V57h140v126" fill="#d1a76e" />
        <path d="M8 183V43h124v140" fill="#e4bf8a" />
        <path
          d="M-4 49h148v10H-4zM5 35h130v12H5zM15 24h110v11H15zM29 14h82v10H29zM44 4h52v10H44z"
          fill="#dcba89"
        />
        <path
          d="M5 45h130M16 33h108M30 22h80"
          stroke="#ab8656"
          strokeWidth="3"
        />
        <path d="M44 183V105c0-43 52-43 52 0v78" fill="#a67e4e" />
        <path d="M51 183V108c0-33 38-33 38 0v75" fill="#fcf3e9" />
        <path d="M16 67h19v116H16zm90 0h18v116h-18z" fill="#edce9e" />
        <path d="M22 72h7v110m83-110h7v110" stroke="#c19a65" strokeWidth="2" />
        <path d="M49 65h42v8H49z" fill="#bd955f" />
        <path d="M0 173h43v10H0zm97 0h43v10H97z" fill="#bd955f" />
        <path d="m96 94 13 12v77H96z" fill="#b68c56" opacity=".5" />
      </g>
      {/* Taj Mahal */}
      <g transform="translate(596 142)">
        <use href="#minaret" x="0" />
        <use href="#minaret" x="113" />
        <path d="M28 138V69h80v69" fill="#e9e6e2" />
        <path d="M24 68h88v7H24z" fill="#dad6d2" />
        <path
          d="M32 65C25 36 50 23 68 10c18 13 43 26 36 55Z"
          fill="url(#marble)"
        />
        <path d="M68 10V-9m-3 5h6" stroke="#c9c4be" strokeWidth="1.5" />
        <path d="M51 138V99q17-30 34 0v39" fill="#d0ccc7" />
        <path d="M58 138V99q10-19 20 0v39" fill="#bfbab5" />
        <path
          d="M33 87h10v16H33zm60 0h10v16H93zm-60 24h10v17H33zm60 0h10v17H93z"
          fill="#ccc7c1"
        />
        <path d="M0 138h143v-7H0z" fill="#e0dcd7" />
      </g>
      {/* Hawa Mahal-inspired sandstone pavilion */}
      <g transform="translate(737 140)" color="#d69c61">
        <use href="#chhatri" x="5" y="-18" />
        <use href="#chhatri" x="143" y="-18" />
        <path d="M0 140V63h177v77" fill="#ed9c68" />
        <path d="M40 140V42h98v98" fill="#d97345" />
        <path d="m34 44 55-35 55 35Z" fill="#e88c52" />
        <path d="m48 49 41-27 41 27v91H48Z" fill="#f4c291" />
        <path d="M62 140V88q27-49 54 0v52" fill="#e7834b" />
        <path d="M72 140V90q17-34 34 0v50" fill="#fce3bc" />
        <path d="M79 140V91q10-23 20 0v49" fill="#98613c" />
        <path
          d="M7 81q10-22 20 0v27H7zm143 0q10-22 20 0v27h-20zM7 124q10-21 20 0v16H7zm143 0q10-21 20 0v16h-20z"
          fill="#bb6240"
        />
        <path d="M-3 62h183v7H-3zM30 44h118v5H30z" fill="#f4bd83" />
        <use href="#chhatri" x="76" y="-7" />
      </g>
      {/* Red Fort */}
      <g transform="translate(908 135)" color="#ba3349">
        <path d="M0 145V62h292v83" fill="url(#fort-red)" />
        <path d="M0 68h292v8H0zM0 132h292v13H0z" fill="#ab2d42" />
        <path d="M8 145V27h48v118M240 145V27h48v118" fill="#c83b50" />
        <path d="M5 26Q32-15 59 26Zm232 0q27-41 54 0Z" fill="#bb3047" />
        <path d="M1 28h61v6H1zm234 0h60v6h-60z" fill="#e3777b" />
        <path d="M89 62V38h118v24" fill="#bd354a" />
        {Array.from({ length: 9 }, (_, i) => (
          <use
            key={i}
            href="#small-arch"
            x={93 + i * 12}
            y="39"
            transform={`translate(${-(93 + i * 12) * 0.05} 0) scale(1.05 1)`}
          />
        ))}
        <path d="M87 34h123v6H87z" fill="#d45a65" />
        {[82, 207].map((x) => (
          <g key={x}>
            <path d={`M${x} 64V-3h8v67`} fill="#b92f46" />
            <path d={`M${x - 2} 0h12v5h-12zm0 16h12v4h-12z`} fill="#df6b73" />
            <path d={`M${x - 2}-4q6-11 12 0Z`} fill="#ad2a40" />
          </g>
        ))}
        {[17, 39, 250, 272].map((x) => (
          <path
            key={x}
            d={`M${x} 69V51q5-11 10 0v18m-10 40V90q5-11 10 0v19`}
            fill="#a92b42"
          />
        ))}
        {[65, 109, 151, 193, 220].map((x) => (
          <path key={x} d={`M${x} 128V94q9-18 18 0v34`} fill="#aa2b40" />
        ))}
        <path d="M131 145v-30q15-25 30 0v30" fill="#9c293e" />
        <path d="M0 58h292" stroke="#df6874" strokeWidth="3" />
      </g>
    </svg>
  );
}
