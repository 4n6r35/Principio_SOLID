export interface TransactionalRepository {
    inTransacion<T>(fn: (t: any) => Promise<T>): Promise<T>
}