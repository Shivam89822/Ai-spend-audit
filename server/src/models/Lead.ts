// Lead model
export interface ILead {
  id: string;
  email: string;
  name: string;
  company?: string;
  createdAt: Date;
}

export class Lead implements ILead {
  id: string;
  email: string;
  name: string;
  company?: string;
  createdAt: Date;

  constructor(email: string, name: string, company?: string) {
    this.id = '';
    this.email = email;
    this.name = name;
    this.company = company;
    this.createdAt = new Date();
  }
}
