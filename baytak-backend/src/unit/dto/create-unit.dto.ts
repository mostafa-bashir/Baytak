export class CreateUnitDto {
  unitName: string;
  unitNumber: string;
  description?: string;
  categoryId: number;
  projectId: number;
}
