import React from 'react'

const Pokemon = (props) => {
    
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    
    return (
        <div>
            {`Pokemon with Id: ${pokemonId}`}
        </div>
    )
}

export default Pokemon
