export interface PageData {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result extends NameUrl {}

export interface Ability {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
}

export interface Form extends NameUrl {}

export interface NameUrl {
  name: string;
  url: string;
}

export interface GameIndice {
  game_index: number;
  version: NameUrl;
}

export interface VersionDetail {
  rarity: number;
  version: NameUrl;
}

export interface HeldItem {
  item: NameUrl;
  version_details: VersionDetail[];
}

export interface Move {
  move: NameUrl;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameUrl;
  version_group: NameUrl;
}

export interface DreamWorld {
  front_default: string;
  front_female?: any;
}

export interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  official_artwork: OfficialArtwork;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: any;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

export interface Type {
  slot: number;
  type: NameUrl;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form;
  game_indices: GameIndice[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: NameUrl;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}
