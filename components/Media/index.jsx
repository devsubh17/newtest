import React from 'react'
import { getMedia } from '../../services';

const Media = (props) => {
    const {id} = props;

    useEffect(() => {
       if(id){
        getMedia(id)
        .then(data => {
        })
       }
    }, [id])
    if(!id) return null;
    return (
        <div>
            
        </div>
    )
}

export default Media
