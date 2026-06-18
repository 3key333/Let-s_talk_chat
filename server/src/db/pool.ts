import { Pool } from 'pg'


export let pool: Pool

export const initDataBase = async () => {

    try {

        pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
        })
            
        const client = pool.connect()
        ;(await client).release()

        console.log('✔️ БД успешно подключена')

    } catch (error) {
        console.log(error)
        throw error
    }

}