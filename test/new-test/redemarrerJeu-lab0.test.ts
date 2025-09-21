import 'jest-extended';
import { readFileSync } from 'fs';
import path from 'path';

import supertest from 'supertest';
import app from '../../src/App'; 
const request = supertest(app);

let content = ""
beforeAll(async () => {
  const filename = path.join('test', 'routes', 'jeuRouter-redemarrerJeu-lab0.test.ts');
  content = readFileSync(filename, 'utf-8');
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("devrait redemarrer le jeu puis 'jouer' retourne 404 pour un joueur inexistant", async () => {
   
    await request.get('/api/v1/jeu/redemarrerJeu');
    const response = await request.get('/api/v1/jeu/jouer/Jean-Marc');
    expect(response.status).toBe(404); 
  });
});
