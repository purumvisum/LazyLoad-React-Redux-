import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridTile, GridList } from 'material-ui/GridList';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    gridList: {
        maxWidth: '620px',
        margin: '0 auto'
    },
    titleStyle: {
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'Arial',
        fontSize: '10px'
    },
    indicatorWrapper: {
        position: 'relative',
        margin: '30px auto',
        display: 'block',
        maxWidth: '50px',
        height: '40px'
    },
    switchButton: {
        position: 'fixed',
        top: 50
    }
};

const GridItem = (props) => (
    <div>
        <MuiThemeProvider>
            <RaisedButton
                style={styles.switchButton}
                onClick={props.switchLoadingUI}
                label={props.infiniteScroll ? 'scroll' : 'click'}
            />
        </MuiThemeProvider>
        <MuiThemeProvider>
            <GridList
                style={styles.gridList}
                cols={4}
                cellHeight={150}
                padding={1}
            >
                {props.items.map((tile) => (
                    <GridTile
                        key={tile.id}
                        title={`${tile.title}  ID:${tile.id}`}
                        titleStyle={styles.titleStyle}
                        titlePosition="top"
                        titleBackground="linear-gradient(rgba(53, 51, 51, 0.7) 0%, rgba(150, 145, 145, 0.3) 70%, rgba(255, 255, 255, 0) 100%)"
                    >
                        <img src={tile.url} alt={tile.url} />
                    </GridTile>
                ))}
            </GridList>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <div style={styles.indicatorWrapper}>
                <RefreshIndicator
                    percentage={100}
                    size={50}
                    left={0}
                    top={0}
                    loadingColor="#6e8668"
                    status={props.loading}
                    onClick={props.onClick}
                />
            </div>
        </MuiThemeProvider>
    </div>
);

GridItem.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.string.isRequired,
    switchLoadingUI: PropTypes.func.isRequired,
    infiniteScroll: PropTypes.bool.isRequired
};

export default GridItem;
