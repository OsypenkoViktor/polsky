export interface ApiResponse {
  settings: Setting[]; // ключи - строки, значения - любые
  contacts: Contact[]; // ключи - строки, значения - любые
  sliderImgList: string[]; // массив строк (URL изображений)
}

export interface Contact {
  type: string;
  value: string;
}

export interface Setting {
  name: "isCalculatorVisible";
  value: number;
}

export interface Prices {
  ceilingMaterials: CeilingMaterial[];
  services: Service[];
}

export type CeilingMaterial = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};
