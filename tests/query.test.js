import imjs from 'imjs';
import queryData from '../src/query';

describe('query', () => {
	const mockData = {
		service: 'http://www.humanmine.org/human',
		entity: { value: 'PL_obesityMonogen_ORahilly09' }
	};

	const filterOptions = {
		// filter object with default values set
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20
	};

	test('should return a promise resolving with correct data', () => {
		const promise = queryData(
			mockData.entity.value,
			mockData.service,
			filterOptions,
			imjs
		).catch(error => console.log(error));

		expect(promise).resolves.toBeInstanceOf(Array);
		return promise.then(res => {
			expect(res.length).toBeGreaterThanOrEqual(1);
			expect(res[0].matches).toBeGreaterThanOrEqual(0);
			expect(res[0].identifier).not.toBeFalsy();
			expect(res[0]['p-value']).not.toBeFalsy();
		});
	});

	test('should return a rejected promise when data not available', () => {
		const promise = queryData(
			'SOME-FAKE-LIST-NAME',
			mockData.service,
			filterOptions,
			imjs
		);
		return promise.catch(res => expect(res).toBe('No data found!'));
	});
});
