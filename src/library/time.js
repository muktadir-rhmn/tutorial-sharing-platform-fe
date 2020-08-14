const time = {
    millisToTime: function(millis) {
        if(millis === null) return '-';
        const date =  new Date(parseInt(millis));
        return`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
}

export default time;