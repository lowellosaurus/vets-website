import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';

import { DefinitionTester, getFormDOM } from '../../../util/schemaform-utils.jsx';
import formConfig from '../../../../src/js/edu-benefits/1990-rjsf/config/form.js';

describe('Edu 1990 dependents', () => {
  const { schema, uiSchema, depends } = formConfig.chapters.personalInformation.pages.dependents;
  it('should render', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={schema}
        data={{
          toursOfDuty: [
            {
              from: '1970-01-01',
              to: '1990-01-01'
            }
          ]
        }}
        uiSchema={uiSchema}/>
    );
    const formDOM = getFormDOM(form);

    expect(formDOM.querySelectorAll('input, select').length).to.equal(6);
  });
  it('should submit form without information', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
        schema={schema}
        data={{
          toursOfDuty: [
            {
              from: '1970-01-01',
              to: '1990-01-01'
            }
          ]
        }}
        uiSchema={uiSchema}/>
    );
    const formDOM = getFormDOM(form);
    formDOM.submitForm();

    expect(formDOM.querySelectorAll('.usa-input-error').length).to.equal(0);
  });
  it('should show page only if served before 1977', () => {
    expect(depends({
      toursOfDuty: [
        {
          dateRange: {
            from: '1970-01-01',
            to: '1990-01-01'
          }
        }
      ]
    })).to.be.true;
    expect(depends({
      toursOfDuty: [
        {
          dateRange: {
            from: '1977-01-02',
            to: '1990-01-01'
          }
        }
      ]
    })).to.be.false;
  });
});
