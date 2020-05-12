const APIKEY_ONE = 'AIzaSyDnwzWskahF2mPuSqLjQRzNFGAfwXdbdsc';
const APIKEY = 'AIzaSyBuIqZL2Au4Bl-LFjeDr0WlGu47uRfBj3I'

function init(){
    gapi.client.setApiKey(APIKEY);
    gapi.client.load('youtube','v3',()=>{
        console.log('loaded');
    });

}


app = new Vue({

    el: "#app",
    data: {
        videos: [],
        query: null,
        emotion: "",
        load: false,
    },
    methods: {


        searchQuery(emotion) {
            let videos = [];
            this.emotion = `'${emotion}' songs`;
            fetch(`/json/${emotion}`)
            .then(
    
                function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    let songs =  data.tracks.track;
                    songs.forEach(song => {

                        let request = gapi.client.youtube.search.list( {
                            part:'snippet',
                            q: `${song.title} ${song.artist_display_name}`,
                            maxResults: 1,
                            
                        });

                        request.execute((res)=>{
                            console.log (res)
                            videos.push(res.items)
                        })
                        
                    });
                    
                });
                })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            })

            console.log(videos)
            this.videos = videos;
            
        },
    },
    
})
