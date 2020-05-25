import React from 'react';
import ReactDOM from 'react-dom';
import imjs from 'imjs';
import GoTerm_vs_Count from '../src/charts/go_term_vs_count';
import queryData from '../src/query';

describe('charts', () => {
	let data = [];
	beforeAll(() => {
		return queryData(
			'PL_GenomicsEngland_GenePanel:Ocular_coloboma',
			'https://www.humanmine.org/humanmine',
			{
				// filter object with default values set
				maxp: 0.05,
				processFilter: 'biological_process',
				correction: 'Holm-Bonferroni',
				limitResults: 20
			},
			imjs
		).then(res => (data = res))
		.catch(error => console.log(`Data not available for provided mock values, please update the mock values to keep the tests updated!`));
	});

	test('go_term_vs_count renders canvas', () => {	
		const el = document.createElement('div');	
		ReactDOM.render(<GoTerm_vs_Count data={data} />, el);
		expect(el.innerHTML).toContain('canvas');	
	});
});
