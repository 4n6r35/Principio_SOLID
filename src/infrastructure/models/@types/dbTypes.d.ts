export { };

declare global {
    type PostgresSQL = {
        BIGSERIAL: bigint;
        BIGINT: bigint;
        CHAR: string;
        VARCHAR: string;
        BOOLEAN: boolean;
        DATE: Date;
        TIMESTAMP_WITHOUT_TIME_ZONE: Date;
        TIMESTAMP_WITH_TIME_ZONE: Date;
    }
}