from geopy.geocoders import Nominatim

def geoloc(loc):
    loc = loc + ', España'
    geolocator = Nominatim(user_agent="my_request")
    location = geolocator.geocode(loc)
    print(location.address)
    return((location.latitude, location.longitude))