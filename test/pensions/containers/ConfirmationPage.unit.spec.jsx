import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';

import { ConfirmationPage } from '../../../src/js/pensions/containers/ConfirmationPage';

const form = {
  submission: {
    response: {
      attributes: {
        confirmationNumber: 'V-PEN-177',
        regionalOffice: [
          'Attention: Western Region',
          'VA Regional Office',
          'P.O. Box 8888',
          'Muskogee, OK 74402-8888'
        ]
      }
    }
  },
  data: {
    veteranFullName: {
      first: 'Jane',
      last: 'Doe'
    }
  }
};

describe('<ConfirmationPage>', () => {
  it('should render', () => {
    const tree = SkinDeep.shallowRender(
      <ConfirmationPage form={form}/>
    );

    expect(tree.subTree('.confirmation-page-title').text()).to.equal('Claim received');
    expect(tree.everySubTree('span')[1].text().trim()).to.equal('for Jane Doe');
    expect(tree.everySubTree('li')[2].text()).to.contain('Western Region');
    expect(tree.everySubTree('p')[0].text()).to.contain('We process claims in the order we receive them');
    expect(tree.everySubTree('p')[1].text()).to.contain('We may contact you for more information or documents.Please print this page for your records');
    expect(tree.everySubTree('p')[3].text()).to.contain('VA Regional Office');
  });
});
