import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Grid,
    makeStyles,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography
} from '@material-ui/core';
import { toCapitalize } from './utils';
import mockData from './mockData';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px"
    },
    cardMedia: {
        margin: 'auto'
    },
    cardContent: {
        textAlign: 'center'
    }
})

const Pokedex = ({ history }) => {

    const classes = useStyles();

    const [pokemonData, setPokemonData] = useState(mockData);

    const getPokemonCard = (pokemonId) => {

        const { id, name } = pokemonData[`${pokemonId}`];
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
            <Grid item xs={12} sm={4} key={id}>
                <Card onClick={() => history.push(`/:${id}`)} >
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: '130px', height: '130px'}}
                    />
                    <CardContent class={classes.cardContent}>
                        <Typography>
                            {`${id}. ${toCapitalize(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>   
        )
    }
    
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {
                pokemonData ? (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map((pokemonId) => {
                            return getPokemonCard(pokemonId)
                        }
                        )}
                    </Grid>
                ) : (
                    <CircularProgress />
                )
            }
        </React.Fragment>
    )
}

export default Pokedex
