import { render, screen } from '../../reducer/test-utils';
import { RestRepository } from '../../../../app/repositories/rest.repository';

import { Notes } from './Notes';
jest.mock('../../../../app/repositories/rest.repository');

RestRepository.prototype.getAll = jest.fn().mockResolvedValue([]);

describe('Given the component Notes', () => {
    describe('When...', () => {
        test('should first', () => {
            render(<Notes></Notes>, {});
        });
    });
});
