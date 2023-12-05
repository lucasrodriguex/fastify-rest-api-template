export interface ExamplePort {
  getById: (id: string) => Promise<any>
}
