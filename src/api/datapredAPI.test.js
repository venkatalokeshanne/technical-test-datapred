const pactum = require('pactum');

const username = "admin";
const password = "super_secret";

it('shoud generate token to test api', async () => {
    const token = btoa(`${username}:${password}`)
    await pactum.spec()
    .get('https://test-backend.i.datapred.com/auth/')
    .withHeaders('Authorization', `Basic ${token}`)
    .expectStatus(200);
})