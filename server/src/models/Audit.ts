// Audit model
export interface IAudit {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data: any;
  results: any;
  createdAt: Date;
  updatedAt: Date;
}

export class Audit implements IAudit {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data: any;
  results: any;
  createdAt: Date;
  updatedAt: Date;

  constructor(userId: string, data: any) {
    this.id = '';
    this.userId = userId;
    this.status = 'pending';
    this.data = data;
    this.results = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
