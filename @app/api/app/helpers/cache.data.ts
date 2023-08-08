import { Redis } from 'ioredis'
import logger from './logger.ts';

const redis = new Redis()
const DEFAULT_EXPIRATION = 3600

// utility function to cache data

export const cacheOrGetCacheData = async (key: string, cb: any) => {
    return new Promise(async (resolve, reject) => {
        let cacheValue;



        logger.info('cacheOrGetCacheData is called', cacheValue)

        cacheValue = await redis.get(key).catch((error) => {
            logger.error(error)
            reject(error)
        })

        if (cacheValue) return resolve(JSON.parse(cacheValue))

        const data = await cb()

        redis.set(key, JSON.stringify(data), 'EX', DEFAULT_EXPIRATION)

        resolve(data)
    })
}