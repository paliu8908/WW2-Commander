
export interface Nation {
  name: string;
  armour: Regiment[];
  infantry: Regiment[];
}

export interface Regiment {
  Name: string;
  types: string[];
  Desc: string;
}