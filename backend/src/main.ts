import 'dotenv/config';
console.log('DATABASE_URL:', process.env.DATABASE_URL);
import { Client } from 'pg';

const dbUrl = process.env.DATABASE_URL;
const dbClient = new Client({ connectionString: dbUrl });

dbClient.connect()
	.then(() => console.log('Connected to Supabase PostgreSQL!'))
	.catch((err) => console.error('Failed to connect to Supabase PostgreSQL:', err));
// Entry point for backend server
// Express setup temporarily removed until backend is ready
// Uncomment and configure when ready to implement backend API
import express from 'express';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
	res.json({ status: 'ok' });
});

import usersRoutes from './routes/users';
import assetsRoutes from './routes/assets';
import protocolsRoutes from './routes/protocols';
import liquiditySignalsRoutes from './routes/liquiditySignals';
import routingIntentsRoutes from './routes/routingIntents';

app.use('/api/users', usersRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/protocols', protocolsRoutes);
app.use('/api/liquidity-signals', liquiditySignalsRoutes);
app.use('/api/routing-intents', routingIntentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`BLCL backend running on port ${PORT}`);
});
