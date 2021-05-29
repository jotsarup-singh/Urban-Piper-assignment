import React from 'react'

export const ListItem = ({select,data}) => {
    return (
        <div className={select} >
            {data.name}
        </div>
    )
}
