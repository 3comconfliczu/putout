test('test: remove', async (t) => {
    t.equal(result, expected);
    t.end();
});

test.only('test: remove', async (t) => {
    t.equal(result, expected);
    t.end();
});

test.skip('test: remove', async (t) => {
    t.equal(result, expected);
    t.end();
});
