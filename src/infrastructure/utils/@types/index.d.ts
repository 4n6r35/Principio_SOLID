export { };
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_DIALECT: string;
            DB_USER: string;
            DB_PASS: string;
            DB_HOST: string;
            DB_PORT: number;
            DB_NAME: string;
            REST_PORT: number
        }
    }

    //Propiedad Personalizada para permitir el alamcenamiento de datos genericos y nulos
    type PropertyNullable<T> = T | null;

    //Propiedad Personalizada para permitir retornar de datos genericos y nulos
    type ReturnNullable<T> = T | null;

    //Propiedad Personalizada del Partial<T> para permitir el alamcenamiento de valores nullos en las propiedades del objeto
    type PartialNullable<T> = {
        [P in keyof T]?: T[P] | null;
    };

    type PartialAnyable<T> = {
        [P in keyof T]?: any;
    };
}