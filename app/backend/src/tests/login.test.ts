import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;
const user = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

describe('Verify route /login', () => {
  let chaiHttpResponse: Response;

  it('Successful login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Failed login without email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: '123456' });
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('All fields must be filled')
  });

  it('Successfully retrieve user role', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });
    const reqValidate = await chai
      .request(app)
      .get('/login/validate')
      .send()
      .set('Authorization', chaiHttpResponse.body.token);
    expect(reqValidate).to.have.status(200);
    expect(reqValidate.body).to.have.property('role');
  });

  it('Failed login with non-existent user', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@teste.com', password: '2223331' });
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  });
});