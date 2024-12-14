import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MARIADB_HOST || 'localhost',
        port: parseInt(process.env.MARIADB_PORT || '3306'),
        database: process.env.MARIADB_DATABASE || 'u139060464_art',
        user: process.env.MARIADB_USER || 'u139060464_art',
        password: process.env.MARIADB_PASSWORD || 'cZ5he?dNh|!',
    },
});

export async function query<T>(
    q: string,
    values: (string | number)[] | string | number = []
): Promise<T> {
    try {
        const results = await db.query(q, values);
        await db.end();
        return results as T;
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw Error(e.message);
    }
}

export default db;
