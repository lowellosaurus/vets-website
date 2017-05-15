import { expect } from 'chai';

import { makeField } from '../../../src/js/common/model/fields';
import preferencesReducer from '../../../src/js/rx/reducers/preferences';

describe('preferencesducer', () => {
  it('should update when fetching preferences', () => {
    const state = preferencesReducer(undefined, {
      type: 'LOADING_PREFERENCES'
    });
    expect(state.loading).to.be.true;
  });

  it('should update when saving preferences', () => {
    const state = preferencesReducer(undefined, {
      type: 'SAVING_PREFERENCES'
    });
    expect(state.saving).to.be.true;
  });

  it('should handle successfully loading preferences', () => {
    const state = preferencesReducer(undefined, {
      type: 'FETCH_PREFERENCES_SUCCESS',
      preferences: {
        emailAddress: 'test@vets.gov',
        rxFlag: true
      }
    });
    expect(state.email.value).to.eql('test@vets.gov');
    expect(state.flag.value).to.eql('true');
    expect(state.loading).to.be.false;
  });

  it('should handle successfully saving preferences', () => {
    const state = preferencesReducer({
      email: makeField('test@vets.gov'),
      flag: makeField('true')
    }, { type: 'SAVE_PREFERENCES_SUCCESS' });
    expect(state.email.value).to.eql('test@vets.gov');
    expect(state.flag.value).to.eql('true');
    expect(state.saving).to.be.false;
  });

  it('should set notification email', () => {
    const state = preferencesReducer(undefined, {
      type: 'SET_NOTIFICATION_EMAIL',
      email: makeField('test@vets.gov', true)
    });
    expect(state.email.value).to.eql('test@vets.gov');
    expect(state.email.dirty).to.be.true;
  });

  it('should set notification flag', () => {
    const state = preferencesReducer(undefined, {
      type: 'SET_NOTIFICATION_FLAG',
      flag: makeField('false', true)
    });
    expect(state.flag.value).to.eql('false');
    expect(state.flag.dirty).to.be.true;
  });
});
