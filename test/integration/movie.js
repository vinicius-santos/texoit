const FILME = require('../integration/data');
const chaiHttp = require('chai-http');
const chai = require('chai');
var server = require('../../server');


chai.should();
chai.use(chaiHttp);
describe('Movie - Endpoints', () => {
	describe('POST /movies', () => {
		it('deve retornar mensagem de sucesso que o usuário foi criado', (done) => {
			chai.request(server).post('/movies')
			.send(FILME.FILME_VALIDO).end((err, res) => {
				chai.assert.isNotEmpty(res.body);
				res.should.be.json;
				done();
			});
		});
		it('deve retornar mensagem de erro', (done) => {
			chai.request(server).post('/movies')
			.send(FILME.FILME_INVALIDO).end((err, res) => {
				chai.assert.isNotEmpty(res.body);
				res.should.be.json;
				done();
			});
		});
		
	});
});
