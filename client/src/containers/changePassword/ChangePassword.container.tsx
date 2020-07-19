import React from 'react';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';

const ChangePassword = (props) => {
  const { t } = props;
  return (
    <div>
      <HeadingLevel>
        <Heading styleLevel={3 as 1}>{t(T.CHANGE_PASSWORD.HEADER.LABEL)}</Heading>
      </HeadingLevel>
    </div>
  );
};

export default ChangePassword;
