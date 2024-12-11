import {createApp} from "./app";
import {initializeDatabase} from "./shared/infrastructure/configuration/Database";
import AppConfig from "./shared/infrastructure/configuration/AppConfig";

const PORT = AppConfig.get('app.port');

(async () => {
    try{
        await initializeDatabase();
        const app = createApp();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server', error);
    }
})();