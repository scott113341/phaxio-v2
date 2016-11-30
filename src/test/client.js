import path from 'path';
import test from 'tape';

import Client from '../client.js';

const CREDENTIALS = ['1a24494b53b5b68817febe1266615b8917c9a5cc', '2ee3a6e464ba2fde41ea8161e2b814ccc1f09b3b']; // TEST
const FIXTURES = [
  path.join(__dirname, 'fixtures/form.pdf'),
  path.join(__dirname, 'fixtures/form-2.pdf')
];
const client = new Client(...CREDENTIALS);

test('Client#constructor', t => {
  t.equal(client.key, '1a24494b53b5b68817febe1266615b8917c9a5cc');
  t.equal(client.secret, '2ee3a6e464ba2fde41ea8161e2b814ccc1f09b3b');
  t.equal(typeof client._request, 'function');
  t.equal(typeof client.Fax, 'object');
  t.end();
});

test('throttling', async t => {
  try {
    const ress = await Promise.all([
      client.Fax.send({
        to: '+13034404585',
        file: FIXTURES[0]
      }),
      client.Fax.send({
        to: '+13034404585',
        file: FIXTURES[1]
      })
    ]);
    t.equal(ress[0].body.success, true);
    t.equal(ress[1].body.success, true);
  } catch (e) {
    console.log(e);
    t.equal(false, true);
  }
  t.end();
});

test('Client.Fax.send', async t => {
  t.equal(typeof client.Fax.send, 'function');
  const res = await client.Fax.send({
    to: '+13034404585',
    file: FIXTURES[0]
  });
  t.equal(res.body.success, true);
  t.end();
});

test('Client.Fax.send multiple', async t => {
  t.equal(typeof client.Fax.send, 'function');
  const res = await client.Fax.send({
    to: '+13034404585',
    file: [
      FIXTURES[0],
      FIXTURES[1]
    ]
  });
  t.equal(res.body.success, true);
  t.end();
});
