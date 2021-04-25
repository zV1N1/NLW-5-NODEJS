import { getCustomRepository, Repository } from 'typeorm'
import { Setting } from '../entities/Settings'
import { SettingsRepositoy } from '../repositories/SettingsRepository'

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingsService {
    private settingsRepository: Repository<Setting>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepositoy)
    }
    
    async create({ chat, username }: ISettingsCreate) {
        // Select * from settings where username = "username" limit 1,
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        })

        if (userAlreadyExists) {
            // lançar um novo erro para a camada de cima
            // quem estiver chamando
            throw new Error('user already exists!')
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        })
    
        await this.settingsRepository.save(settings)

        return settings
    }
    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        })
        return settings
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where("username = : username", {
                username,
            })
            .execute()
    }
}


        
export { SettingsService }
