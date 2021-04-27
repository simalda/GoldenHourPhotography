# from DataAccess import *
class LocationHandler():
    def __init__(self, data_access):
        self.data_access = data_access
     
    def get_all_locations_info(self):
        locations = self.data_access.get_all_locations_info()
        for location in locations:
            images_by_location = self.data_access.get_all_images_for_location(location["name"])
            if(len(images_by_location) != 0):
                location["images"] = images_by_location
        return locations

    def get_all_locations_types(self):
        locations = self.data_access.get_all_locations_types()
        return locations

    def add_location(self, location):
        pass

    def remove_location(self, location):
        pass

