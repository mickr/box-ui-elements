/**
 * @flow
 * @file Version component
 */

import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import IconInfoInverted from '../../../../icons/general/IconInfoInverted';
import messages from '../../../common/messages';
import PlainButton from '../../../../components/plain-button';
import selectors from '../../../common/selectors/version';
import { ACTIVITY_TARGETS } from '../../../common/interactionTargets';
import { VERSION_UPLOAD_ACTION, VERSION_DELETE_ACTION, VERSION_RESTORE_ACTION } from '../../../../constants';
import './Version.scss';

type Props = {
    id: string,
    modified_by: User,
    onInfo?: Function,
    version_number: string,
    version_restored?: string,
} & InjectIntlProvidedProps;

const ACTION_MAP = {
    [VERSION_DELETE_ACTION]: messages.versionDeleted,
    [VERSION_RESTORE_ACTION]: messages.versionRestored,
    [VERSION_UPLOAD_ACTION]: messages.versionUploaded,
};

const Version = (props: Props): React.Node => {
    const action = selectors.getVersionAction(props);
    const { id, intl, onInfo, version_number, version_restored } = props;
    const { name } = selectors.getVersionUser(props);

    return (
        <div className="bcs-Version">
            <span className="bcs-Version-message">
                <FormattedMessage
                    {...ACTION_MAP[action]}
                    values={{
                        name: <strong>{name}</strong>,
                        version_number: version_restored || version_number,
                    }}
                />
            </span>
            {onInfo ? (
                <span className="bcs-Version-actions">
                    <PlainButton
                        aria-label={intl.formatMessage(messages.getVersionInfo)}
                        className="bcs-Version-info"
                        data-resin-target={ACTIVITY_TARGETS.VERSION_CARD}
                        onClick={() => {
                            onInfo({ id, version_number });
                        }}
                        type="button"
                    >
                        <IconInfoInverted height={16} width={16} />
                    </PlainButton>
                </span>
            ) : null}
        </div>
    );
};

export { Version as VersionBase };
export default injectIntl(Version);
