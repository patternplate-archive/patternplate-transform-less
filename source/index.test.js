import test from 'ava';
import expect from 'unexpected';
import factory from '../source';
import * as mocks from './mocks';

test('it should export a function as default', t => {
	const actual = typeof factory;
	const expected = 'function';
	t.deepEqual(actual, expected);
});

test('calling the function should return a function', t => {
	const actual = typeof factory(mocks.application);
	const expected = 'function';
	t.deepEqual(actual, expected);
});

test('calling the returned function should return a promise', t => {
	const transform = factory(mocks.application);
	const actual = transform(mocks.emptyFile).constructor.name;
	const expected = 'Promise';
	t.deepEqual(actual, expected);
});

test('the returned promise should resolve to an object', async t => {
	const transform = factory(mocks.application);
	const actual = Object.prototype.toString(await transform(mocks.emptyFile));
	const expected = '[object Object]';
	t.deepEqual(actual, expected);
});

test('the resolved object should have a buffer key', async t => {
	const transform = factory(mocks.application);
	const file = await transform(mocks.emptyFile);
	t.truthy(Object.prototype.hasOwnProperty.call(file, 'buffer'));
});

test('it should transform less files correctly', async () => {
	const transform = factory(mocks.application);
	const file = await transform(mocks.simpleFile);
	expect(file.buffer, 'to be', `.foo {\n  color: red;\n}\n`);
});

test('it should transform less files with pattern dependencies', async () => {
	const transform = factory(mocks.application);
	const file = await transform(mocks.dependentFile);
	expect(file.buffer, 'to be', `.foo {\n  color: red;\n}\n.bar {\n  color: green;\n}\n`);
});

test('it should fail for less files with missing dependencies', async t => {
	const transform = factory(mocks.application);
	const file = mocks.missingDependenciesFile;
	t.throws(transform(file), /Could not find less dependency "simple"/);
});

test('it should transform less files with transitive pattern dependencies', async () => {
	const transform = factory(mocks.application);
	const file = await transform(mocks.transitiveFile);
	expect(file.buffer, 'to be', `.foo {\n  color: red;\n}\n.bar {\n  color: green;\n}\n.baz {\n  color: blue;\n}\n`);
});

test('it should fail for less files with direct access to transitive dependencies', async t => {
	const transform = factory(mocks.application);
	const file = mocks.invalidTransitiveFile;
	t.throws(transform(file), /Could not find less dependency "simple"/);
});
