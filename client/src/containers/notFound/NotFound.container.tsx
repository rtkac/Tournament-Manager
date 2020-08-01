import React from 'react';
import { useTranslation } from 'react-i18next';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';
import Alert from 'baseui/icon/alert';

import { NotFoundDiv, NotFoundHeading, NotFoundIcon } from './NotFound.container.style';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFoundDiv>
      <HeadingLevel>
        <Heading
          styleLevel={1 as 1}
          overrides={{
            Block: {
              style: () => {
                return {
                  marginBottom: 0,
                  marginTop: 0,
                };
              },
            },
          }}
        >
          <NotFoundHeading>
            <NotFoundIcon>
              <Alert size={35} />
            </NotFoundIcon>
            {t(T.NOT_FOUND.TITLE)}
          </NotFoundHeading>
        </Heading>
      </HeadingLevel>
      <HeadingLevel>
        <Heading styleLevel={5 as 1}>{t(T.NOT_FOUND.SUB_TITLE)}</Heading>
      </HeadingLevel>
    </NotFoundDiv>
  );
};

export default NotFound;
