import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useStyletron} from 'baseui';
import {Grid, Cell} from 'baseui/layout-grid';


import {test} from 'actions/user.actions';

const Outer = ({children, test}) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                background: theme.colors.accent100,
            })}
        >
            {children}
        </div>
    );
};

  const Inner = ({children}) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: theme.colors.accent200,
                color: theme.colors.accent700,
                padding: '.25rem',
            })}
        >
            {children}
        </div>
    );
};

const Login = () => {
    useEffect(() => {
        test()
    }, []);

    return (
        <Outer>
            <Grid>
                <Cell span={2}>
                    <Inner>1</Inner>
                </Cell>
                <Cell skip={[1, 4, 7]} span={[1, 2, 3]}>
                    <Inner>2</Inner>
                </Cell>
            </Grid>
        </Outer>
    )
}

export default connect(null, {test})(Login);