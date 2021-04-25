import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settings";

@EntityRepository(Setting)
class SettingsRepositoy extends Repository<Setting> {

}

export { SettingsRepositoy }
