import 'mocha';
import { expect } from 'chai';
import { bye } from '../src/byeworld';

describe('Tests ejercicio 10', () => {
	it('bye bye', () => {
		expect(bye()).to.be.equal("bye world :(");
	});
});