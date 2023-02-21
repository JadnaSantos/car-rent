import { app } from './infra/http/config/app';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server is running 🚀 - ${port}`));
