
export type ThemeId =
  | 'adriatic'
  | 'sunset'
  | 'forest'
  | 'alpine'
  | 'lavender'

export interface TravelTheme {
  id: ThemeId
  name: string
  description: string
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  muted: string
}
