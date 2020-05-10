const APIKEY = 'AIzaSyDnwzWskahF2mPuSqLjQRzNFGAfwXdbdsc';

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
    },
    methods: {
        searchQuery() {

            fetch('http://musicovery.com/api/V6/playlist.php?&fct=getfromtag&resultsnumber=5&tag=sad&popularitymin=50',{ crossDomain: true })
                 .then(
                    (response) => {
                        console.log(response)
                    });



            // let request = gapi.client.youtube.search.list( {
            //     part:'snippet',
            //     q: this.query,
            //     maxResults: 1,
            // });

            // request.execute((res)=>{
            //     console.log(res)
            //     this.videos = res.items;
            // })
            
        },
    },
    
})


