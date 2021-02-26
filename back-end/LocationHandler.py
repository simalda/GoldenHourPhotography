from DataAccess import *
class LocationHandler():
    def __init__(self, dataAccess):
        self.dataAccess = dataAccess
     
    def get_all_locations_info(self):
        locations = self.dataAccess.getAllLocationsInfo()
        for location in locations:
            imagesByLocation = self.dataAccess.getAllImagesForLocation(location["name"])
            if(len(imagesByLocation) != 0):
                location["images"] = imagesByLocation
        return locations

# da =DataAccess()
# lh = LocationHandler(da)
# print(lh.get_all_locations_info())