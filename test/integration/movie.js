const FILME = require('../integration/data');
const chaiHttp = require('chai-http');
const chai = require('chai');
var server = require('../../server');

chai.should();
chai.use(chaiHttp);
describe('Movie - Endpoints', () => {
	describe('POST /movies', () => {
		it('deve retornar mensagem de sucesso que o usuário foi criado', (done) => {
			chai.request(server).post('/movies').send(FILME.FILME_VALIDO).end((err, res) => {
				chai.assert.isNotEmpty(res.body);
				chai.assert.strictEqual('Item saved', res.body, 'String deve ser igual, com retorno de sucesso');
				res.should.be.json;
				done();
			});
		});
	});

	describe('PUT /movies', () => {
		it('deve retornar mensagem de sucesso que o usuário foi atualizado', (done) => {
			chai.request(server).put('/movies/' + 3).send(FILME.FILME_VALIDO).end((err, res) => {
				chai.assert.isNotEmpty(res.body);
				chai.assert.strictEqual('Item updated', res.body, 'String deve ser igual, com retorno de sucesso');
				res.should.be.json;
				done();
			});
		});
	});
});
