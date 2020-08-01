import React from 'react';
import { useStyletron } from 'baseui';

import Spinner from 'components/spinner/Spinner.component';

import { Grid, Cell } from 'baseui/layout-grid';
import { Check, Delete } from 'baseui/icon';
import { ResultDiv, ResultTitle, ResultIcon, ResultSubTitle } from './ResultScreen.component.style';

const ResultScreen = (props: ResultScreenProps) => {
  const [css, theme] = useStyletron();

  const Icon = () =>
    props.isLoading ? (
      <Spinner size={22} />
    ) : props.isError ? (
      <Delete size={43} color={theme.colors.negative} />
    ) : (
      <Check size={43} color={theme.colors.positive} />
    );

  return (
    <Grid
      overrides={{
        Grid: {
          style: () => ({
            height: '100%',
          }),
        },
      }}
    >
      <Cell skip={[0, 1, 3]} span={[12, 6]}>
        <ResultDiv>
          <ResultTitle>
            <ResultIcon $loading={props.isLoading}>{Icon()}</ResultIcon>
            {props.title}
          </ResultTitle>
          {props.subTitle && (
            <ResultSubTitle>
              <p>{props.subTitle}</p>
            </ResultSubTitle>
          )}
        </ResultDiv>
      </Cell>
    </Grid>
  );
};

interface ResultScreenProps {
  title: string;
  subTitle?: string;
  isError?: boolean;
  isLoading?: boolean;
}

export default ResultScreen;
