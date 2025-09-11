// test/routes/jeuRouter-redemarrerJeu-lab0.test.ts
import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/App'; 

const request = supertest(app);

const testNom1 = 'Alice';
const testNom2 = 'Bob';

beforeAll(async () => {
  // Précondition: au moins un joueur existe (on en crée deux)
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it('devrait répondre 200 (OK) et retourner du JSON (scénario principal)', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it("devrait satisfaire la postcondition : après redémarrage, il n'y a plus de joueurs", async () => {
    // on redémarre explicitement pour l’indépendance du test
    await request.get('/api/v1/jeu/redemarrerJeu');

    const response = await request.get('/api/v1/joueurs');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBeTrue();
    expect(response.body.length).toBe(0);
  });
});
