import React from 'react'
export const ListItem = ({select,data,handlemouseClick,index}) => {
    return (
        <div className={select} onClick={()=>handlemouseClick(index)} >
            <div>
                <div>{data.name}</div>
                <div>{data.birth_year}</div>
            </div>
            <div>{data.gender}</div>
        </div>
    )
}
