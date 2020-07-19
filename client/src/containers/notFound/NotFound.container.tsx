import React from 'react';
import { useTranslation } from 'react-i18next';
import T from 'i18n/translationsKeyMapping';

import { Heading, HeadingLevel } from 'baseui/heading';

import { NotFoundDiv } from './NotFound.container.style';

const NotFound = (props) => {
  const { t } = useTranslation();

  return (
    <NotFoundDiv>
      <HeadingLevel>
        <Heading
          styleLevel={2 as 1}
          overrides={{
            Block: {
              style: () => {
                return {
                  marginBottom: 0,
                };
              },
            },
          }}
        >
          {t(T.NOT_FOUND.TITLE)}
        </Heading>
      </HeadingLevel>
      <HeadingLevel>
        <Heading styleLevel={4 as 1}>{t(T.NOT_FOUND.SUB_TITLE)}</Heading>
      </HeadingLevel>
    </NotFoundDiv>
  );
};

export default NotFound;
