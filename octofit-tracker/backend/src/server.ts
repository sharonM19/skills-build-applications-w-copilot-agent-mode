import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  codespaceName ? `https://${codespaceName}-5173.app.github.dev` : null,
  codespaceName ? `https://${codespaceName}-8000.app.github.dev` : null,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

const registerCollectionRoutes = (resource: string, Model: mongoose.Model<any>) => {
  app.get([`/api/${resource}`, `/api/${resource}/`], async (_request, response) => {
    const items = (await Model.find({})).map((document) => document.toJSON());
    response.json(items);
  });

  app.post([`/api/${resource}`, `/api/${resource}/`], async (request, response) => {
    const payload = request.body ?? {};
    const nextId = (await Model.countDocuments()) + 1;
    const item = await Model.create({ ...payload, id: payload.id ?? nextId });
    response.status(201).json(item.toJSON());
  });
};

registerCollectionRoutes('users', User);
registerCollectionRoutes('teams', Team);
registerCollectionRoutes('activities', Activity);
registerCollectionRoutes('leaderboard', LeaderboardEntry);
registerCollectionRoutes('workouts', Workout);

app.get(['/api/health', '/api/health/'], (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    apiBaseUrl,
  });
});

app.get(['/api/config', '/api/config/'], (_request, response) => {
  response.json({
    apiBaseUrl,
    codespaceName: codespaceName || null,
    port,
    frontendUrl: codespaceName ? `https://${codespaceName}-5173.app.github.dev` : 'http://localhost:5173',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});