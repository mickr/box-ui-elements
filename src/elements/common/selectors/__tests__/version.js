import selectors from '../version';
import {
    PLACEHOLDER_USER,
    VERSION_DELETE_ACTION,
    VERSION_RESTORE_ACTION,
    VERSION_UPLOAD_ACTION,
} from '../../../../constants';

describe('elements/common/selectors/version', () => {
    const defaultUser = { name: 'Test User', id: 10 };
    const restoreDate = '2019-04-01T00:00:00';
    const restoreUser = { name: 'Restore User', id: 12 };
    const trashedDate = '2019-05-01T00:00:00';
    const trashedUser = { name: 'Delete User', id: 11 };

    describe('getVersionAction()', () => {
        test.each`
            restored_at    | trashed_at     | version_restored | expected
            ${null}        | ${null}        | ${null}          | ${VERSION_UPLOAD_ACTION}
            ${restoreDate} | ${null}        | ${null}          | ${VERSION_RESTORE_ACTION}
            ${restoreDate} | ${trashedDate} | ${null}          | ${VERSION_RESTORE_ACTION}
            ${null}        | ${null}        | ${'1'}           | ${VERSION_RESTORE_ACTION}
            ${null}        | ${trashedDate} | ${null}          | ${VERSION_DELETE_ACTION}
        `('should return the most relevant action', ({ expected, restored_at, trashed_at, version_restored }) => {
            const version = {
                restored_at,
                trashed_at,
                version_restored,
            };

            expect(selectors.getVersionAction(version)).toEqual(expected);
        });
    });

    describe('getVersionUser()', () => {
        test.each`
            modified_by    | restored_by    | trashed_by     | expected
            ${null}        | ${null}        | ${null}        | ${PLACEHOLDER_USER}
            ${defaultUser} | ${null}        | ${null}        | ${defaultUser}
            ${defaultUser} | ${restoreUser} | ${null}        | ${restoreUser}
            ${defaultUser} | ${restoreUser} | ${trashedUser} | ${restoreUser}
            ${defaultUser} | ${null}        | ${trashedUser} | ${trashedUser}
        `('should return the most relevant user', ({ expected, modified_by, restored_by, trashed_by }) => {
            const version = {
                modified_by,
                restored_by,
                trashed_by,
            };

            expect(selectors.getVersionUser(version)).toEqual(expected);
        });
    });
});
