import { Category } from "./category";
import { Project } from "./project";

export interface Unit {
  id: number;
  unitName: string;
  unitNumber: string;
  price: number;
  area: number;
  image?: string;
  description?: string;
  category: Category;
  project: Project;
}