import React from 'react'
import {
    AppBar,
    Toolbar,
    Grid,
    makeStyles,
    Card,
    CardContent
} from '@material-ui/core';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px"
    }
})

const getPokemonCard = () => {
    return (
        <Grid item xs={12} sm={4}>
            <Card>
                <CardContent>
                    Pokemon
                </CardContent>
            </Card>
        </Grid>   
    )
}

const Pokedex = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            <Grid container spacing={2} className={classes.pokedexContainer}>
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
            </Grid>
        </React.Fragment>
    )
}

export default Pokedex
