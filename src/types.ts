export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface CardConfig {
  id: string;
  rarity: Rarity;
  level: number;
  note?: string; // Optional property for storing notes
}

export interface CardChangeDetail {
  cardId: string;
  rarity: Rarity;
  level: number;
  note?: string;
}
