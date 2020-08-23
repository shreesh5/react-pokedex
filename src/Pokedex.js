import React, { useState, useEffect } from 'react'
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
import axios from 'axios';
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

    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                    }
                });
                setPokemonData(newPokemonData);
            })
    },[]);

    const getPokemonCard = (pokemonId) => {

        const { id, name, sprite } = pokemonData[pokemonId];

        return (
            <Grid item xs={12} sm={4} lg={2} key={id}>
                <Card onClick={() => history.push(`/${id}`)} >
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
