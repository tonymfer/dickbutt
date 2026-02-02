export const WIN98_COLORS = {
  highlight: 'rgb(223, 223, 223)',
  face: 'rgb(192, 192, 192)',
  shadow: 'rgb(128, 128, 128)',
  darkShadow: '#0a0a0a',
  white: '#ffffff',
  black: '#000000',
} as const;

export const WIN98_BORDERS = {
  raised: 'rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223)',
  pressed: 'rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128)',
} as const;

export const WIN98_SHADOWS = {
  raised: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff',
  field: 'inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a',
  status: 'inset -1px -1px #dfdfdf, inset 1px 1px #808080',
  well: 'inset -1px -1px #fff, inset 1px 1px #808080',
} as const;
