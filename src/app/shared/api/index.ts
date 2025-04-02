import { environment } from "../../../environments/environment.development";

const serverIp = environment.apiUrl;
//объект настроек
export const API = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`,
    tours: `${serverIp}/tours`,
    tour: `${serverIp}/tour`,
    config: `/config/config.json`
}