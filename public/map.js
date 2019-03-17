function initMap() {
    const mapEl = document.getElementById("main-map")
    const textEl = document.getElementById("results")
    var marker;
    let LATITUDE = 8.4861597
    let LONGITUDE = 124.6545985
    if (document.getElementById('latitude').value) {
        LATITUDE = document.getElementById('latitude').value
        LONGITUDE = document.getElementById('longitude').value
    }
    var map = new google.maps.Map(mapEl, {
        zoom: 20,
        center: new google.maps.LatLng(parseFloat(LATITUDE), parseFloat(LONGITUDE)),
        mapTypeId: 'satellite'
    })
    var defaultMarker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(LATITUDE), parseFloat(LONGITUDE)),
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    })

    google.maps.event.addListener(map, 'click', function (e) {
        console.log(e.latLng);
        placeMarker(e.latLng, map);
    })

    function placeMarker(location, map) {
        if (marker == null) {
            marker = new google.maps.Marker({
                position: location,
                map: map
            })
        } else {
            marker.setPosition(location)
        }
        map.panTo(location);

        // get details
        let clientIdEl = document.getElementById("clientId");
        let mobileClientId = clientIdEl.value;
        let lat = location.lat();
        let lng = location.lng();



        let radioEl = document.querySelector("input[name='eventDesc']:checked");
        let eventDesc = radioEl.getAttribute("text");
        let activityEntryTypeId = radioEl.getAttribute("data");

        let timestamp = moment().format('YYYY-MM-DD hh:mm:ss');
        console.log(activityEntryTypeId);
        switch (parseInt(activityEntryTypeId)) {
            case 11:
                timestamp = moment('2019-03-17 08:23:22').format('YYYY-MM-DD hh:mm:ss');
                break;
            case 12:
                timestamp = moment('2019-03-17 14:23:22').format('YYYY-MM-DD hh:mm:ss');
                break;
            case 13:
                timestamp = moment('2019-03-17 23:23:22').format('YYYY-MM-DD hh:mm:ss');
                break;
        }
        // construct json
        let data = {
            deviceId: "unknown",
            mobileClientId: mobileClientId,
            activityEntryTypeId: activityEntryTypeId,
            clientTimestamp: timestamp,
            entryDesc: eventDesc,
            clientLongitude: lng,
            clientLatitude: lat
        }
        let dataString = JSON.stringify(data, undefined, 4);
        console.log(dataString);
        textEl.value = dataString;
        /**
        // ajax call
        let xhr = new XMLHttpRequest();
        // Setup our listener to process completed requests
        xhr.onload = function () {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                console.log('success!', xhr);
            } else {
                // What do when the request fails
                console.log('The request failed!');
            }

            // Code that should run regardless of the request status
            console.log('This always runs...');
        };

        // Create and send a POST request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        
        xhr.open('POST', 'http://localhost:8082/mobile/location');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBcHBUZWNoQVBJR2F0ZXdheSIsInVzZXJJZCI6IjEyMzQ1NjciLCJyb2xlIjoiYWRtaW4ifQ.i4YU9K8UZ2X1uAfXn2BMH8jUJ5zK_R4mjkJ2loSsy1_9Q7Wcmhitejl_93Kqw5QbZGNOhCZqHN6am5bUVC8ceA');

        xhr.send(data);
         */
    }
}

function copyToClipboard(textarea) {
    this.textarea = textarea;
    this.textarea.focus(); this.textarea.select(); document.execCommand('copy');
}

