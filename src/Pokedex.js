import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography,
    TextField
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { toCapitalize } from './utils';

const useStyles = makeStyles((theme) => ({
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
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingRight: "20px",
        paddingLeft: "20px",
        marginTop: "5px",
        marginBottom: "5px"
    },
    searchIcon: {
        alignSelf: 'flex-end',
        marginBottom: "5px"
    },
    searchInput: {
        width: "200px",
        margin: "5px"
    }
}));

const Pokedex = ({ history }) => {

    const classes = useStyles();

    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

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

    const handleSearchChange = (e) => {
        console.log("target", e.target.value);
        setFilter(e.target.value);
    };

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
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon}/>
                        <TextField 
                            className={classes.searchInput}
                            label="Pokemon"
                            variant="standard"
                            onChange={handleSearchChange}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {
                pokemonData ? (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map((pokemonId) => {
                            return pokemonData[pokemonId].name.includes(filter) && getPokemonCard(pokemonId)
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
