import { useId } from 'react';
import type { Lang } from './data';
import { copy } from './data';

export function PlaceArt({ index = 0, lang, compact = false }: { index?: number; lang: Lang; compact?: boolean }) {
  const id = useId();
  const height = compact ? 366 : 420;
  return <svg className="place-art" viewBox={`0 0 630 ${height}`} role="img" aria-labelledby={id}>
    <title id={id}>{copy.symbolic[lang]}</title>
    <rect width="630" height={height} rx="16" fill={['#D4D9CD', '#DAD4C4', '#D9D0BE', '#D1D5CB'][index]} />
    {index < 2 ? <g transform={`translate(76 ${height * .14}) scale(.83)`}>
      <path d="M40 180 L260 55 L480 180 L450 195 L70 195 Z" fill="#A52219" />
      <path d="M85 195H435V370H85Z" fill="#B69266"/><path d="M145 238H375V370H145Z" fill="#756B53"/><path d="M200 370V260H320V370" fill="#D9CBB1"/>
      <path d="M50 382H485M85 215H435M120 195V370M400 195V370" fill="none" stroke="#171611" strokeWidth="5"/>
      <path d="M165 237H230V300H165ZM285 237H350V300H285Z" fill="#44523C" stroke="#EAE4D7" strokeWidth="8"/>
    </g> : index === 2 ? <g transform={`translate(113 ${height * .12}) scale(.79)`}>
      <path d="M180 100L260 5L340 100V420H100V220L180 130Z" fill="#EEE9DE" stroke="#171611" strokeWidth="6"/>
      <path d="M260 5V-20M245-8H275" stroke="#171611" strokeWidth="7"/>
      <path d="M220 405V295Q260 230 300 295V405ZM155 280V210Q180 165 205 210V280ZM315 280V210Q340 165 365 210V280Z" fill="#44523C" stroke="#A7B79C" strokeWidth="8"/>
    </g> : <g transform={`translate(315 ${height * .47})`}>
      <circle r="105" fill="#9A8D70"/>{Array.from({ length: 12 }, (_, i) => <rect key={i} x="-18" y="-135" width="36" height="70" fill="#9A8D70" transform={`rotate(${i * 30})`}/>)}
      <circle r="73" fill="#F6F3EB"/><circle r="37" fill="#A52219"/>
    </g>}
    <text x="24" y={height - 22} fontSize="12" fill="#68655C">{copy.symbolic[lang]}</text>
  </svg>;
}

export function ObjectArt({ index, lang }: { index: number; lang: Lang }) {
  return <svg className="object-art" viewBox="0 0 368 270" role="img" aria-label={copy.symbolic[lang]}>
    <rect width="368" height="270" rx="10" fill={['#D4D9CD', '#D6C7AD', '#D9CEC2'][index]}/>
    <rect x="89" y="49" width="190" height="178" rx={index === 2 ? 5 : 24} fill={['#44523C', '#8D684B', '#A52219'][index]}/>
    <path d="M183 49V227M89 136H279" stroke="#F6F3EB" strokeWidth="8"/>
  </svg>;
}
