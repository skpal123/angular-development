export interface IKeyValue<T = any> {
    [key: string]: T;
  }
  
  export interface IPaginationParams {
     page: number;
     per_page: number;
  }