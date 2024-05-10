import connect from './src/app/lib/mongodb'

export async function register() {
    await connect()
}